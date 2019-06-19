import hashlib
import MySQLdb

from django.core.exceptions import ValidationError

from ..settings import MY_SQL_PROBLEM_TYPE_HOST, MY_SQL_PROBLEM_TYPE_USER, MY_SQL_PROBLEM_TYPE_USER_PASSWORD


def clean_my_sql_problem_type(my_SQL_instance):

    schema_SQL = getattr(my_SQL_instance, 'schema_SQL', None)
    if not schema_SQL:
        raise ValidationError({'schema_SQL': 'missing schema SQL'})

    root_user_connection = MySQLdb.connect(host=MY_SQL_PROBLEM_TYPE_HOST,
                                           user=MY_SQL_PROBLEM_TYPE_USER,
                                           passwd=MY_SQL_PROBLEM_TYPE_USER_PASSWORD)

    root_user_cursor = root_user_connection.cursor()

    # 1.1 Create MYSQL schema(database) with MySQL name
    database_name = 'answer_{0}'.format(my_SQL_instance.pk)
    database_user_name = 'answer_user_{0}'.format(my_SQL_instance.pk)

    database_sql = "DROP SCHEMA IF EXISTS {0}; CREATE SCHEMA {0};".format(database_name)
    # We need 2 mysql users here
    # 1st can CREATE DATABASE and can CREATE 2nd user (which have only created DATABASE privileges)
    # and DROP DATABASES/2nd user
    # 2st (db_user_sql) can use only created DATABASE
    root_user_cursor.execute(database_sql)

    # Not so good, need to think.
    db_user_password = hashlib.md5(database_name.encode('utf-8')).hexdigest()

    # CREATE USER 'answer_2'@'localhost' IDENTIFIED WITH mysql_native_password BY 'fdsgd';
    # GRANT ALL PRIVILEGES ON *.* TO 'answer_2'@'localhost'

    db_user_sql = "DROP USER IF EXISTS {0}@'{2}';" \
                  "CREATE USER '{0}'@'{2}' IDENTIFIED WITH mysql_native_password BY '{3}';" \
                  "GRANT ALL PRIVILEGES ON {1}.* TO `{0}`@`{2}`;" \
        .format(database_user_name, database_name, MY_SQL_PROBLEM_TYPE_HOST, db_user_password)
    root_user_cursor.execute(db_user_sql)

    # "FLUSH PRIVILEGES;".\

    db_user_connection = MySQLdb.connect(host=MY_SQL_PROBLEM_TYPE_HOST,
                                         user=database_name,
                                         passwd=db_user_password)

    db_user_cursor = db_user_connection.cursor()

    # schema_SQL = db_user_connection.escape_string(schema_SQL)

    db_user_cursor.execute('USE {0}; {1};'.format(database_name, schema_SQL))

