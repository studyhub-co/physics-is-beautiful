import hashlib
import MySQLdb

from django.core.exceptions import ValidationError

from ..settings import MY_SQL_PROBLEM_TYPE_HOST, MY_SQL_PROBLEM_TYPE_USER, MY_SQL_PROBLEM_TYPE_USER_PASSWORD


# pretty print fetchall
def pp(cursor, data=None, rowlens=0):
    d = cursor.description
    if not d:
        return "#### NO RESULTS ###"
    names = []
    lengths = []
    rules = []
    if not data:
        data = cursor.fetchall()
    for dd in d:    # iterate over description
        l = dd[1]
        if not l:
            l = 12             # or default arg ...
        l = max(l, len(dd[0])) # Handle long names
        names.append(dd[0])
        lengths.append(l)
    for col in range(len(lengths)):
        if rowlens:
            rls = [len(row[col]) for row in data if row[col]]
            lengths[col] = max([lengths[col]]+rls)
        rules.append("-"*lengths[col])
    format = " ".join(["%%-%ss" % l for l in lengths])
    result = [format % tuple(names)]
    result.append(format % tuple(rules))
    for row in data:
        result.append(format % row)
    return "\n".join(result)


def clean_my_sql_problem_type(my_SQL_instance):

    schema_SQL = getattr(my_SQL_instance, 'schema_SQL', None)
    if not schema_SQL:
        my_SQL_instance.schema_SQL = ''
        my_SQL_instance.save()
        raise ValidationError({'schema_SQL': 'Missing schema SQL'})

    # TODO add try catch for all connections
    root_user_connection = MySQLdb.connect(host=MY_SQL_PROBLEM_TYPE_HOST,
                                           user=MY_SQL_PROBLEM_TYPE_USER,
                                           passwd=MY_SQL_PROBLEM_TYPE_USER_PASSWORD)

    root_user_cursor = root_user_connection.cursor()

    # 1.1 Create MYSQL schema(database) with MySQL name
    # TODO IMPORTANT we need to add request.user.id to database_name and database_user_name
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

    # db_user_sql = "DROP USER IF EXISTS {0}@'{2}';" \
    #               "CREATE USER '{0}'@'{2}' IDENTIFIED WITH mysql_native_password BY '{3}';" \
    #               "GRANT ALL PRIVILEGES ON {1}.* TO `{0}`@`{2}`;" \
    #     .format(database_user_name, database_name, MY_SQL_PROBLEM_TYPE_HOST, db_user_password)
    #
    # root_user_cursor.execute(db_user_sql)

    db_user_connection = MySQLdb.connect(host=MY_SQL_PROBLEM_TYPE_HOST,
                                         user=database_user_name,
                                         passwd=db_user_password)

    # CREATE TABLES AND ADD DATA (SCHEMA PANEL)
    # TODO 1.2 Check schema_SQL for only DDL and DML statements
    try:

        db_user_cursor = db_user_connection.cursor()
        # schema_SQL = db_user_connection.escape_string(schema_SQL)
        db_user_cursor.execute('USE {0}; {1};'.format(database_name, schema_SQL), multi=True)
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
            # schema_SQL = db_user_connection.escape_string(schema_SQL)
            db_user_cursor.execute('USE {0}; {1};'.format(database_name, query_SQL))
            query_rows = db_user_cursor.fetchall()
            my_SQL_instance.text = pp(db_user_cursor, query_rows, rowlens=1)
            db_user_cursor.close()
            # save
        except MySQLdb.Error as e:
            raise ValidationError({'schema_SQL': 'Invalid query SQL'})

    # DROP SCHEMA AND USER
