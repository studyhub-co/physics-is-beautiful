# import simplejson as json
import json
import random
import hashlib
import MySQLdb

# from django.core.exceptions import ValidationError, ImproperlyConfigured
from rest_framework.exceptions import ValidationError, APIException
from django.core.serializers.json import DjangoJSONEncoder

from ..settings import MYSQL_PROBLEM_TYPE_HOST, MYSQL_PROBLEM_TYPE_USER, MYSQL_PROBLEM_TYPE_USER_PASSWORD


class MysqlServerUnavailable(APIException):
    status_code = 503
    default_detail = 'Can\'t connect to MYSQL database'
    default_code = 'service_unavailable'


def from_db_cursor(cursor):
    field_names = [col[0] for col in cursor.description]
    rows = cursor.fetchall()
    result_string = ' '.join(field_names)
    result_json = {'columns': [i[0] for i in cursor.description], 'data': rows}
    for row in rows:
        result_string += '\n'
        result_string += ' '.join(str(x) for x in row)
    return result_string, json.dumps(result_json, cls=DjangoJSONEncoder)


def validate_mysql_schema_query(data):
    # if check_query_SQL is not none - validate output

    sql_schema = data.get('SQLSchema', None)
    if not sql_schema:
        raise ValidationError({'SQLSchema': 'Missing schema SQL'})

    sql_query = data.get('SQLQuery', None)

    sql_schema_result_json = ''
    expected_output = ''
    expected_output_json = ''

    root_user_connection = None
    # try / catch for all connection
    try:
        root_user_connection = MySQLdb.connect(host=MYSQL_PROBLEM_TYPE_HOST,
                                               user=MYSQL_PROBLEM_TYPE_USER,
                                               passwd=MYSQL_PROBLEM_TYPE_USER_PASSWORD,
                                               autocommit=True
                                               )

        root_user_cursor = root_user_connection.cursor()

        db_schema_created = False

        while not db_schema_created:
            # 1.1 Create MYSQL schema(database) with MySQL name

            # create random database name
            _hash = random.getrandbits(63)
            database_name = 's{0}'.format(_hash)
            database_user_name = 'u{0}'.format(_hash)
            db_user_password = hashlib.md5(database_name.encode('utf-8')).hexdigest()

            # database_sql = "DROP SCHEMA IF EXISTS {0}; CREATE SCHEMA {0};".format(database_name)
            database_sql = "CREATE SCHEMA {0};".format(database_name)
            # We need 2 mysql users here
            # 1st can CREATE DATABASE and can CREATE 2nd user (which have only privileges inside created DATABASE )
            # and DROP DATABASES/2nd user (= MY_SQL_PROBLEM_TYPE_USER)
            # 2st (db_user_sql) can only use the created DATABASE (SELECT and etc)

            # db_user_sql = "DROP USER IF EXISTS {0}@'{2}';" \
            #               "CREATE USER '{0}'@'{2}' IDENTIFIED WITH mysql_native_password BY '{3}';" \
            #               "GRANT ALL PRIVILEGES ON {1}.* TO `{0}`@`{2}`;" \
            db_user_sql = "CREATE USER '{0}'@'%' IDENTIFIED WITH mysql_native_password BY '{2}';" \
                          "GRANT ALL PRIVILEGES ON {1}.* TO `{0}`@`%`;" \
                .format(database_user_name, database_name, db_user_password)

            try:
                root_user_cursor.execute(database_sql)
                root_user_cursor.execute(db_user_sql)
                root_user_cursor.close()
                db_schema_created = True
            except MySQLdb.Error as e:
                if e.args[0] == 1007:  # DB exist
                    pass
                else:
                    raise MysqlServerUnavailable()

        try:
            db_user_connection = MySQLdb.connect(host=MYSQL_PROBLEM_TYPE_HOST,
                                                 user=database_user_name,
                                                 passwd=db_user_password,
                                                 db=database_name,
                                                 autocommit=True
                                                 )
        except MySQLdb.Error as e:
            raise MysqlServerUnavailable()

        # CREATE TABLES AND ADD DATA (SCHEMA PANEL)
        # TODO 1.2 Check schema_SQL for only DDL and DML statements
        try:
            db_user_cursor = db_user_connection.cursor()
            # schema_SQL = db_user_connection.escape_string(schema_SQL)
            db_user_cursor.execute('{1}'.format(database_name, sql_schema))
            db_user_cursor.close()
            # schema_is_valid = True
        except MySQLdb.Error as e:
            # schema_is_valid = False
            raise ValidationError({'SQLSchema': 'Invalid SQL schema: {}'.format(e)})

        # get schema and data, save sql_schema_json
        try:
            db_user_cursor = db_user_connection.cursor()
            # get all tables names
            db_user_cursor.execute(
                'SELECT table_name FROM information_schema.tables where table_schema=%s;',
                [database_name]
            )
            json_schema = []
            for table_row in db_user_cursor:
                db_table_cursor = db_user_connection.cursor()
                db_table_cursor.execute('SELECT * FROM {};'.format(table_row[0]))
                json_schema.append({
                    table_row[0]: {
                        'columns': [i[0] for i in db_table_cursor.description],
                        'data': db_table_cursor.fetchall()
                    }
                })
                # for table_row in db_table_cursor.fetchall():
                #     json_schema[table_name].append(table_row)
            sql_schema_result_json = json.dumps(json_schema, cls=DjangoJSONEncoder)
        except MySQLdb.Error as e:
            pass

        #  2. Try to run query_SQL if exist
        # TODO 2 Check schema_SQL for only SELECT query
        # if not check_query_SQL:
            # save output

        if sql_query:
            try:
                db_user_cursor = db_user_connection.cursor()
                db_user_cursor.execute('{1}'.format(database_name, sql_query))
                expected_output, expected_output_json = from_db_cursor(db_user_cursor)
                db_user_cursor.close()
            except MySQLdb.Error as e:
                raise ValidationError({'SQLQuery': 'Invalid query SQL'})

        result = {
            'SQLSchemaResultJson': sql_schema_result_json,
            'expectedOutput': expected_output,  # show to the teacher
            'expectedOutputJson': expected_output_json,  # save in json component data
        }

        return result

        # fixme: it seems should be in separate api student call?
        # else:
        #     # validate output!
        #     try:
        #         db_user_cursor = db_user_connection.cursor()
        #         db_user_cursor.execute('{1}'.format(database_name, check_query_SQL))
        #         checked_query_SQL_string, checked_query_SQL_json = from_db_cursor(db_user_cursor)
        #             # .get_string()
        #         db_user_cursor.close()
        #         return my_SQL_instance.text.lower() == checked_query_SQL_string.lower()
        #     except MySQLdb.Error as e:
        #         # TODO return error
        #         return False
    # cath connection errorr
    except MySQLdb.OperationalError as e:
        # TODO catch all MySQLdb exceptions
        raise MysqlServerUnavailable()

    # DROP SCHEMA AND USER
    finally:
        if root_user_connection:
            root_user_cursor = root_user_connection.cursor()
            root_user_cursor.execute('DROP SCHEMA IF EXISTS {0}; '.format(database_name))
            root_user_cursor.execute('DROP USER IF EXISTS {0}@\'{1}\''.format(database_user_name,
                                                                              MYSQL_PROBLEM_TYPE_HOST))

            root_user_cursor.close()


# old version of problemtype validation - todo remove

# def clean_my_sql_problem_type(my_SQL_instance, check_query_SQL=None):
#     # if check_query_SQL is not none - validate output
#
#     schema_SQL = getattr(my_SQL_instance, 'schema_SQL', None)
#     if not schema_SQL:
#         my_SQL_instance.schema_SQL = ''
#         my_SQL_instance.save()
#         raise ValidationError({'schema_SQL': 'Missing schema SQL'})
#
#     # add try catch for all connections
#     try:
#         root_user_connection = MySQLdb.connect(host=MY_SQL_PROBLEM_TYPE_HOST,
#                                                user=MY_SQL_PROBLEM_TYPE_USER,
#                                                passwd=MY_SQL_PROBLEM_TYPE_USER_PASSWORD,
#                                                autocommit=True
#                                                )
#
#         root_user_cursor = root_user_connection.cursor()
#
#         db_schema_created = False
#
#         while not db_schema_created:
#             # 1.1 Create MYSQL schema(database) with MySQL name
#
#             # create database name
#             _hash = random.getrandbits(63)
#             database_name = 's{0}'.format(_hash)
#             # database_user_name = 'answer_user_{0}'.format(my_SQL_instance.pk)
#             database_user_name = 'u{0}'.format(_hash)
#             db_user_password = hashlib.md5(database_name.encode('utf-8')).hexdigest()
#
#             # database_sql = "DROP SCHEMA IF EXISTS {0}; CREATE SCHEMA {0};".format(database_name)
#             database_sql = "CREATE SCHEMA {0};".format(database_name)
#             # We need 2 mysql users here
#             # 1st can CREATE DATABASE and can CREATE 2nd user (which have only created DATABASE privileges)
#             # and DROP DATABASES/2nd user
#             # 2st (db_user_sql) can use only created DATABASE
#
#             # db_user_sql = "DROP USER IF EXISTS {0}@'{2}';" \
#             #               "CREATE USER '{0}'@'{2}' IDENTIFIED WITH mysql_native_password BY '{3}';" \
#             #               "GRANT ALL PRIVILEGES ON {1}.* TO `{0}`@`{2}`;" \
#             db_user_sql = "CREATE USER '{0}'@'%' IDENTIFIED WITH mysql_native_password BY '{2}';" \
#                           "GRANT ALL PRIVILEGES ON {1}.* TO `{0}`@`%`;" \
#                 .format(database_user_name, database_name, db_user_password)
#
#             try:
#                 root_user_cursor.execute(database_sql)
#                 root_user_cursor.execute(db_user_sql)
#                 root_user_cursor.close()
#                 db_schema_created = True
#             except MySQLdb.Error as e:
#                 if e.args[0] == 1007:  # DB exist
#                     pass
#                 else:
#                     raise ImproperlyConfigured('Can\'t create MYSQL schema')
#
#         try:
#             db_user_connection = MySQLdb.connect(host=MY_SQL_PROBLEM_TYPE_HOST,
#                                                  user=database_user_name,
#                                                  passwd=db_user_password,
#                                                  db=database_name,
#                                                  autocommit=True
#                                                  )
#         except MySQLdb.Error as e:
#             raise ImproperlyConfigured('Can\'t connect to MYSQL database')
#
#         # CREATE TABLES AND ADD DATA (SCHEMA PANEL)
#         # TODO 1.2 Check schema_SQL for only DDL and DML statements
#         try:
#             db_user_cursor = db_user_connection.cursor()
#             # schema_SQL = db_user_connection.escape_string(schema_SQL)
#             db_user_cursor.execute('{1}'.format(database_name, schema_SQL))
#             db_user_cursor.close()
#             my_SQL_instance.schema_is_valid = True
#         except MySQLdb.Error as e:
#             my_SQL_instance.schema_is_valid = False
#             my_SQL_instance.save()  # wee need to save wrong Invalid schema to allow user edit in the future
#             raise ValidationError({'schema_SQL': 'Invalid schema SQL: {}'.format(e)})
#
#         # get schema and data, save schema_SQL_json
#         try:
#             db_user_cursor = db_user_connection.cursor()
#             # get all tables names
#             db_user_cursor.execute(
#                 'SELECT table_name FROM information_schema.tables where table_schema=%s;',
#                 [database_name]
#             )
#             json_schema = []
#             for table_row in db_user_cursor:
#                 db_table_cursor = db_user_connection.cursor()
#                 db_table_cursor.execute('SELECT * FROM {};'.format(table_row[0]))
#                 json_schema.append({
#                     table_row[0]: {
#                         'columns': [i[0] for i in db_table_cursor.description],
#                         'data': db_table_cursor.fetchall()
#                     }
#                 })
#                 # for table_row in db_table_cursor.fetchall():
#                 #     json_schema[table_name].append(table_row)
#             my_SQL_instance.schema_SQL_json = json.dumps(json_schema, cls=DjangoJSONEncoder)
#         except MySQLdb.Error as e:
#             pass
#
#         #  2. Try to run query_SQL if exist
#         # TODO 2 Check schema_SQL for only SELECT query
#         if not check_query_SQL:
#             # save output
#             query_SQL = getattr(my_SQL_instance, 'query_SQL', None)
#
#             if query_SQL:
#                 try:
#                     db_user_cursor = db_user_connection.cursor()
#                     db_user_cursor.execute('{1}'.format(database_name, query_SQL))
#                     my_SQL_instance.text, my_SQL_instance.expected_output_json \
#                         = from_db_cursor(db_user_cursor)
#                         # .get_string()
#                     db_user_cursor.close()
#                 except MySQLdb.Error as e:
#                     my_SQL_instance.text = ''
#                     my_SQL_instance.save()
#                     raise ValidationError({'schema_SQL': 'Invalid query SQL'})
#         else:
#             # validate output!
#             try:
#                 db_user_cursor = db_user_connection.cursor()
#                 db_user_cursor.execute('{1}'.format(database_name, check_query_SQL))
#                 checked_query_SQL_string, checked_query_SQL_json = from_db_cursor(db_user_cursor)
#                     # .get_string()
#                 db_user_cursor.close()
#                 return my_SQL_instance.text.lower() == checked_query_SQL_string.lower()
#             except MySQLdb.Error as e:
#                 # TODO return error
#                 return False
#
#     # DROP SCHEMA AND USER
#     finally:
#         if root_user_connection:
#             root_user_cursor = root_user_connection.cursor()
#             root_user_cursor.execute('DROP SCHEMA IF EXISTS {0}; '.format(database_name))
#             root_user_cursor.execute('DROP USER IF EXISTS {0}@\'{1}\''.format(database_user_name,
#                                                                               MY_SQL_PROBLEM_TYPE_HOST))
#
#             root_user_cursor.close()


# TODO refactor this (much duplicate code)
def get_json_result_from_sql(my_SQL_instance, query_sql):
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
            _hash = random.getrandbits(63)
            database_name = 's{0}'.format(_hash)
            database_user_name = 'u{0}'.format(_hash)
            db_user_password = hashlib.md5(database_name.encode('utf-8')).hexdigest()

            database_sql = "CREATE SCHEMA {0};".format(database_name)

            db_user_sql = "CREATE USER '{0}'@'%' IDENTIFIED WITH mysql_native_password BY '{2}';" \
                          "GRANT ALL PRIVILEGES ON {1}.* TO `{0}`@`%`;" \
                .format(database_user_name, database_name, db_user_password)

            try:
                root_user_cursor.execute(database_sql)
                root_user_cursor.execute(db_user_sql)
                root_user_cursor.close()
                db_schema_created = True
            except MySQLdb.Error as e:
                if e.args[0] == 1007:  # DB exist
                    pass
                else:
                    raise ImproperlyConfigured('Can\'t create MYSQL schema')

        try:
            db_user_connection = MySQLdb.connect(host=MY_SQL_PROBLEM_TYPE_HOST,
                                                 user=database_user_name,
                                                 passwd=db_user_password,
                                                 db=database_name,
                                                 autocommit=True
                                                 )
        except MySQLdb.Error as e:
            raise ImproperlyConfigured('Can\'t connect to MYSQL database')

        try:
            db_user_cursor = db_user_connection.cursor()
            db_user_cursor.execute('{1}'.format(database_name, schema_SQL))
            db_user_cursor.close()
        except MySQLdb.Error as e:
            raise e

        # generate output!
        try:
            db_user_cursor = db_user_connection.cursor()
            db_user_cursor.execute('{1}'.format(database_name, query_sql))
            checked_query_SQL_string, checked_query_SQL_json = from_db_cursor(db_user_cursor)
            # .get_string()
            db_user_cursor.close()
            return checked_query_SQL_json
        except MySQLdb.Error as e:
            raise e

    # DROP SCHEMA AND USER
    finally:
        root_user_cursor = root_user_connection.cursor()
        root_user_cursor.execute('DROP SCHEMA IF EXISTS {0}; '.format(database_name))
        root_user_cursor.execute('DROP USER IF EXISTS {0}@\'{1}\''.format(database_user_name,
                                                                          MY_SQL_PROBLEM_TYPE_HOST))

        root_user_cursor.close()
