from __future__ import unicode_literals

from django.db import connection
from django.apps import AppConfig
# from django.contrib.staticfiles.apps import StaticFilesConfig


# class CoursesConfig(StaticFilesConfig):
class CoursesConfig(AppConfig):
    name = 'courses'

    # # ignore node_modules folders
    # def __init__(self, app_name, app_module):
    #     self.ignore_patterns += ['js']
    #     super(CoursesConfig, self).__init__(app_name, app_module)

    def ready(self):
        import courses.receivers

        # TODO rewrite - exclude Question and answers, add Material

        # recreate postgres sql clone functions
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

                -- clone course tags
                DROP FUNCTION IF EXISTS courses_clone_tags;
                CREATE FUNCTION courses_clone_tags(IN content_type varchar, 
                                           IN old_object_id uuid,
                                           IN new_object_id uuid
                                         )
                    RETURNS void
                AS $body$
                DECLARE
                need_content_type_id int;
                begin

                SELECT id INTO need_content_type_id FROM public.django_content_type WHERE model=content_type AND app_label='courses';
                INSERT INTO public.courses_uuidtaggeditem (object_id, content_type_id, tag_id)
                SELECT new_object_id, need_content_type_id, tag_id FROM public.courses_uuidtaggeditem WHERE object_id=old_object_id;
                end;
                $body$
                language plpgsql;

                -- clone materials func
                -- TODO it seem we no need to generate slug now? 
                DROP FUNCTION IF EXISTS courses_clone_materials;
                CREATE function courses_clone_materials(IN lesson_id_from uuid, IN lesson_id_to uuid) 
                    RETURNS TABLE (
                      material_id_to uuid, 
                      material_id_from uuid
                )
                AS $body$
                begin
                RETURN QUERY
                WITH sel AS (
                   SELECT uuid, "name", "position", "data", material_problem_type_id, author_id, 
                        last_edit_user_id, material_workflow_type, row_number() OVER (ORDER BY uuid) AS rn
                   FROM public.courses_material
                   WHERE lesson_id=lesson_id_from
                   ORDER BY uuid
                   )
                   , ins AS (
                   INSERT INTO public.courses_material (created_on, updated_on, uuid, "name", "position", "data", 
                        material_problem_type_id, author_id, last_edit_user_id, material_workflow_type, lesson_id)
                   SELECT NOW(), NOW(), uuid_generate_v4(), "name", "position", "data", material_problem_type_id, 
                        author_id, last_edit_user_id, material_workflow_type, lesson_id_to
                   FROM sel ORDER BY uuid
                   RETURNING uuid
                )
                SELECT i.uuid AS material_id_to, s.uuid AS material_id_from
                FROM (SELECT uuid, row_number() OVER (ORDER BY uuid) AS rn FROM ins) i
                JOIN sel s USING (rn);

                end;
                $body$
                language plpgsql;

                -- clone lessons func
                DROP FUNCTION IF EXISTS courses_clone_lessons;
                CREATE function courses_clone_lessons(IN module_id_from uuid, IN module_id_to uuid) 
                    RETURNS TABLE (
                      lesson_id_to uuid, 
                      lesson_id_from uuid
                )
                AS $body$
                begin

                RETURN QUERY
                WITH sel AS (
                   SELECT "name", image, "position", uuid, lesson_type, row_number() OVER (ORDER BY uuid) AS rn
                   FROM public.courses_lessons
                   WHERE module_id=module_id_from
                   ORDER BY uuid
                   )
                   , ins AS (
                   INSERT INTO public.courses_lessons (created_on, updated_on, uuid, "name", image, "position", module_id, lesson_type)
                   SELECT NOW(), NOW(), uuid_generate_v4(), 
                       "name", image, "position", module_id_to, lesson_type
                   FROM sel ORDER BY uuid
                   RETURNING id, uuid
                )
                SELECT i.uuid AS lesson_id_to, s.uuid AS lesson_id_from
                FROM (SELECT uuid, row_number() OVER (ORDER BY uuid) AS rn FROM ins) i
                JOIN sel s USING (rn);

                end;
                $body$
                language plpgsql;

                -- clone modules func
                DROP FUNCTION IF EXISTS courses_clone_modules;
                CREATE function courses_clone_modules(IN unit_id_from uuid, IN unit_id_to uuid) 
                    RETURNS TABLE (
                      module_id_to uuid, 
                      module_id_from uuid
                )
                AS $body$
                begin

                RETURN QUERY
                WITH sel AS (
                   SELECT "name", image, "position", uuid, row_number() OVER (ORDER BY uuid) AS rn
                   FROM public.courses_modules
                   WHERE unit_id=unit_id_from
                   ORDER BY uuid
                   )
                   , ins AS (
                   INSERT INTO public.courses_modules (created_on, updated_on, uuid, "name", image, "position", unit_id)
                   SELECT NOW(), NOW(), uuid_generate_v4(), "name", image, "position", unit_id_to
                   FROM sel ORDER BY uuid
                   RETURNING uuid
                )
                SELECT i.uuid AS module_id_to, s.uuid AS module_id_from
                FROM (SELECT uuid, row_number() OVER (ORDER BY uuid) AS rn FROM ins) i
                JOIN sel s USING (rn);

                end;
                $body$
                language plpgsql;

                -- clone units
                DROP FUNCTION IF EXISTS courses_clone_units;
                CREATE FUNCTION courses_clone_units(IN curr_id_from uuid, IN curr_id_to uuid) 
                RETURNS TABLE (
                      unit_id_to uuid,
                      unit_id_from uuid
                ) 
                AS $body$
                BEGIN

                RETURN QUERY
                WITH sel AS (
                   SELECT "name", image, "position", uuid, row_number() OVER (ORDER BY uuid) AS rn
                   FROM public.courses_units
                   WHERE course_id=curr_id_from
                   ORDER BY uuid
                   )
                   , ins AS (
                   INSERT INTO public.courses_units (created_on, updated_on, uuid, "name", image, "position", course_id)
                   SELECT NOW(), NOW(), uuid_generate_v4(), "name", image, "position", curr_id_to
                   FROM sel ORDER BY uuid
                   RETURNING uuid
                )
                SELECT i.uuid AS unit_id_to, s.uuid AS unit_id_from
                FROM (SELECT id, row_number() OVER (ORDER BY uuid) AS rn FROM ins) i
                JOIN sel s USING (rn);

                END;
                $body$
                language plpgsql;
                """)
