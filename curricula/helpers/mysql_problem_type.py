import random
import hashlib
import MySQLdb

from django.core.exceptions import ValidationError, PermissionDenied

from prettytable import from_db_cursor

from ..settings import MY_SQL_PROBLEM_TYPE_HOST, MY_SQL_PROBLEM_TYPE_USER, MY_SQL_PROBLEM_TYPE_USER_PASSWORD


def clean_my_sql_problem_type(my_SQL_instance):

    schema_SQL = getattr(my_SQL_instance, 'schema_SQL', None)
    if not schema_SQL:
        my_SQL_instance.schema_SQL = ''
        my_SQL_instance.save()
        raise ValidationError({'schema_SQL': 'Missing schema SQL'})

    # add try catch for all connections
    try:
        root_user_connection = MySQLdb.connect(host=MY_SQL_PROBLEM_TYPE_HOST,
                                               user=MY_SQL_PROBLEM_TYPE_USER,
                                               passwd=MY_SQL_PROBLEM_TYPE_USER_PASSWORD,
                                               autocommit=True
                                               )

        root_user_cursor = root_user_connection.cursor()

        db_schema_created = False

        while not db_schema_created:
            # 1.1 Create MYSQL schema(database) with MySQL name

            # create database name
            _hash = random.getrandbits(63)
            database_name = 's{0}'.format(_hash)
            # database_user_name = 'answer_user_{0}'.format(my_SQL_instance.pk)
            database_user_name = 'u{0}'.format(_hash)
            db_user_password = hashlib.md5(database_name.encode('utf-8')).hexdigest()

            # database_sql = "DROP SCHEMA IF EXISTS {0}; CREATE SCHEMA {0};".format(database_name)
            database_sql = "CREATE SCHEMA {0};".format(database_name)
            # We need 2 mysql users here
            # 1st can CREATE DATABASE and can CREATE 2nd user (which have only created DATABASE privileges)
            # and DROP DATABASES/2nd user
            # 2st (db_user_sql) can use only created DATABASE

            # db_user_sql = "DROP USER IF EXISTS {0}@'{2}';" \
            #               "CREATE USER '{0}'@'{2}' IDENTIFIED WITH mysql_native_password BY '{3}';" \
            #               "GRANT ALL PRIVILEGES ON {1}.* TO `{0}`@`{2}`;" \
            db_user_sql = "CREATE USER '{0}'@'{2}' IDENTIFIED WITH mysql_native_password BY '{3}';" \
                          "GRANT ALL PRIVILEGES ON {1}.* TO `{0}`@`{2}`;" \
                .format(database_user_name, database_name, MY_SQL_PROBLEM_TYPE_HOST, db_user_password)

            try:
                root_user_cursor.execute(database_sql)
                root_user_cursor.execute(db_user_sql)
                root_user_cursor.close()
                db_schema_created = True
            except MySQLdb.Error as e:
                if e.args[0] == 1007:  # DB exist
                    pass
                else:
                    raise PermissionDenied('Can\'t create MYSQL database')

        try:
            db_user_connection = MySQLdb.connect(host=MY_SQL_PROBLEM_TYPE_HOST,
                                                 user=database_user_name,
                                                 passwd=db_user_password,
                                                 db=database_name,
                                                 autocommit=True
                                                 )
        except MySQLdb.Error as e:
            raise PermissionDenied('Can\'t connect to MYSQL database')

        # CREATE TABLES AND ADD DATA (SCHEMA PANEL)
        # TODO 1.2 Check schema_SQL for only DDL and DML statements
        try:

            db_user_cursor = db_user_connection.cursor()
            # schema_SQL = db_user_connection.escape_string(schema_SQL)
            db_user_cursor.execute('{1}'.format(database_name, schema_SQL))
            db_user_cursor.close()
            my_SQL_instance.schema_is_valid = True
        except MySQLdb.Error as e:
            my_SQL_instance.schema_is_valid = False
            my_SQL_instance.save()  # wee need to save wrong Invalid schema to allow user edit in the future
            raise ValidationError({'schema_SQL': 'Invalid schema SQL'})

        #  2. Try to run query_SQL if exist
        # TODO 2 Check schema_SQL for only SELECT query
        query_SQL = getattr(my_SQL_instance, 'query_SQL', None)

        if query_SQL:
            try:
                db_user_cursor = db_user_connection.cursor()
                db_user_cursor.execute('{1}'.format(database_name, query_SQL))
                my_SQL_instance.text = from_db_cursor(db_user_cursor).get_string()
                db_user_cursor.close()
            except MySQLdb.Error as e:
                my_SQL_instance.text = ''
                my_SQL_instance.save()
                raise ValidationError({'schema_SQL': 'Invalid query SQL'})

    # DROP SCHEMA AND USER
    finally:
        root_user_cursor = root_user_connection.cursor()
        root_user_cursor.execute('DROP SCHEMA IF EXISTS {0}; '.format(database_name))
        root_user_cursor.execute('DROP USER IF EXISTS {0}@\'{1}\''.format(database_user_name,
                                                                          MY_SQL_PROBLEM_TYPE_HOST))

        root_user_cursor.close()
