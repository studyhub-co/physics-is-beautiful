from __future__ import unicode_literals

from django.db import connection
from django.apps import AppConfig


class CoursesConfig(AppConfig):
    name = 'courses'

    def ready(self):
        import courses.receivers

        # TODO rewrite - exclude Question and answers, add Material

        # recreate postgres sql clone functions
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

                -- clone tags
                DROP FUNCTION IF EXISTS clone_tags;
                CREATE FUNCTION clone_tags(IN content_type varchar, 
                                           IN old_object_id int,
                                           IN new_object_id int
                                         )
                    RETURNS void
                AS $body$
                DECLARE
                need_content_type_id int;
                begin

                SELECT id INTO need_content_type_id FROM public.django_content_type WHERE model=content_type AND app_label='courses';
                INSERT INTO public.taggit_taggeditem (object_id, content_type_id, tag_id)
                SELECT new_object_id, need_content_type_id, tag_id FROM public.taggit_taggeditem WHERE object_id=old_object_id;
                end;
                $body$
                language plpgsql;


                -- clone question vectors
                DROP FUNCTION IF EXISTS clone_question_vectors;
                CREATE FUNCTION clone_question_vectors(IN question_from_id int, 
                                                     IN question_to_id int
                                                     )
                    RETURNS void
                AS $body$
                begin
                WITH ins_vector AS (
                    INSERT INTO public.courses_vectors (created_on, updated_on, 
                                                          angle, magnitude,
                                                          x_component, y_component) 
                    SELECT NOW(), NOW(), courses_vectors.angle, courses_vectors.magnitude,
                    courses_vectors.x_component, courses_vectors.y_component
                    FROM public.courses_vectors
                    LEFT JOIN public.courses_questions_vectors 
                    ON public.courses_questions_vectors.vector_id=public.courses_vectors.id
                    WHERE courses_questions_vectors.question_id=question_from_id
                    RETURNING id 
                )
                INSERT INTO public.courses_questions_vectors(vector_id, question_id) 
                select id, question_to_id 
                from ins_vector;

                end;
                $body$
                language plpgsql;

                -- clone content answer type func
                DROP FUNCTION IF EXISTS clone_answer_content;
                CREATE FUNCTION clone_answer_content(IN content_type_id int, 
                                                     IN content_object_id int
                                                     )
                    RETURNS INT
                AS $body$
                DECLARE
                content_type character varying(100);
                new_content_object_id int;
                begin

                -- 1. Get original content type
                SELECT model INTO content_type FROM public.django_content_type WHERE id=content_type_id AND app_label='courses';
                -- 2. Get original content object answer
                CASE content_type
                    WHEN 'text' THEN 
                        INSERT INTO public.courses_text (created_on, updated_on, text) 
                        SELECT NOW(), NOW(), text 
                        FROM public.courses_text WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;
                    WHEN 'vector' THEN 
                        INSERT INTO public.courses_vectors (created_on, updated_on, magnitude, angle, x_component, y_component) 
                        SELECT NOW(), NOW(), magnitude, angle, x_component, y_component 
                        FROM public.courses_vectors WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;
                    WHEN 'mathematicalexpression' THEN 
                        INSERT INTO public.courses_mathematical_expressions (created_on, updated_on, representation) 
                        SELECT NOW(), NOW(), representation
                        FROM public.courses_mathematical_expressions WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;
                    WHEN 'unitconversion' THEN 
                        INSERT INTO public.courses_unitconversion (created_on, updated_on, answer_number, 
                                                                     answer_unit, conversion_steps, numerator,
                                                                     denominator, question_number, question_unit, 
                                                                     show_answer, unit_conversion_type													 
                                                                    ) 
                        SELECT NOW(), NOW(), answer_number, 
                                                                     answer_unit, conversion_steps, numerator,
                                                                     denominator, question_number, question_unit, 
                                                                     show_answer, unit_conversion_type
                        FROM public.courses_unitconversion WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;
                    WHEN 'imagewtext' THEN 
                        INSERT INTO public.courses_image_w_text (created_on, updated_on, "text", image) 
                        SELECT NOW(), NOW(), "text", image
                        FROM public.courses_image_w_text WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;
                    WHEN 'mysql' THEN 
                        INSERT INTO public.courses_mysql (created_on, updated_on, "query_SQL", "schema_SQL", 
                                                            "schema_SQL_json", "text", expected_output_json, schema_is_valid) 
                        SELECT NOW(), NOW(), "query_SQL", "schema_SQL", 
                                                            "schema_SQL_json", "text", expected_output_json, schema_is_valid
                        FROM public.courses_mysql WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;		
                    ELSE
                        new_content_object_id := 0;
                END CASE;

                RETURN new_content_object_id;

                end;
                $body$
                language plpgsql;

                -- clone answers func
                DROP FUNCTION IF EXISTS clone_answers;
                CREATE function clone_answers(IN quesion_id_from int, IN question_id_to int) 
                    RETURNS TABLE (
                      answer_id_to INT, 
                      answer_id_from INT
                )
                AS $body$
                declare new_content_object_id int;
                begin
                RETURN QUERY
                WITH sel AS (
                    SELECT id, object_id, content_type_id, "position", uuid, is_correct, row_number() OVER (ORDER BY id) AS rn
                    FROM public.courses_answers
                    WHERE question_id=quesion_id_from
                    ORDER BY id
                   )
                   , ins AS (
                    INSERT INTO public.courses_answers (created_on, updated_on, uuid, "position", question_id, 
                                                          content_type_id, is_correct, object_id)
                    SELECT NOW(), NOW(), uuid_generate_v4()::text,  "position", 
                       question_id_to, content_type_id, is_correct, clone_answer_content(content_type_id, object_id)
                    FROM sel ORDER BY id
                    RETURNING id, uuid
                )
                SELECT i.id AS answer_id_to, s.id AS answer_id_from
                FROM (SELECT id, row_number() OVER (ORDER BY id) AS rn FROM ins) i
                JOIN sel s USING (rn);

                end;
                $body$
                language plpgsql;

                -- clone questions func
                DROP FUNCTION IF EXISTS clone_questions;
                CREATE function clone_questions(IN lesson_id_from int, IN lesson_id_to int) 
                    RETURNS TABLE (
                      question_id_to INT, 
                      question_id_from INT
                )
                AS $body$
                begin
                RETURN QUERY
                WITH sel AS (
                   SELECT id, "text", hint, image, solution_text, "position", uuid, answer_type, row_number() OVER (ORDER BY id) AS rn
                   FROM public.courses_questions
                   WHERE lesson_id=lesson_id_from
                   ORDER BY id
                   )
                   , ins AS (
                   INSERT INTO public.courses_questions (created_on, updated_on, uuid, "text", hint, image, 
                                                           "position", lesson_id, answer_type, solution_text)
                   SELECT NOW(), NOW(), uuid_generate_v4()::text, 
                       "text", hint, image, "position", lesson_id_to, answer_type, solution_text
                   FROM sel ORDER BY id
                   RETURNING id, uuid
                )
                SELECT i.id AS question_id_to, s.id AS question_id_from
                FROM (SELECT id, row_number() OVER (ORDER BY id) AS rn FROM ins) i
                JOIN sel s USING (rn);

                end;
                $body$
                language plpgsql;

                -- clone lessons func
                DROP FUNCTION IF EXISTS clone_lessons;
                CREATE function clone_lessons(IN module_id_from int, IN module_id_to int) 
                    RETURNS TABLE (
                      lesson_id_to INT, 
                      lesson_id_from INT
                )
                AS $body$
                begin

                RETURN QUERY
                WITH sel AS (
                   SELECT id, "name", image, "position", uuid, lesson_type, row_number() OVER (ORDER BY id) AS rn
                   FROM public.courses_lessons
                   WHERE module_id=module_id_from
                   ORDER BY id
                   )
                   , ins AS (
                   INSERT INTO public.courses_lessons (created_on, updated_on, uuid, "name", image, "position", module_id, lesson_type)
                   SELECT NOW(), NOW(), uuid_generate_v4()::text, 
                       "name", image, "position", module_id_to, lesson_type
                   FROM sel ORDER BY id
                   RETURNING id, uuid
                )
                SELECT i.id AS lesson_id_to, s.id AS lesson_id_from
                FROM (SELECT id, row_number() OVER (ORDER BY id) AS rn FROM ins) i
                JOIN sel s USING (rn);

                end;
                $body$
                language plpgsql;

                -- clone modules func
                DROP FUNCTION IF EXISTS clone_modules;
                CREATE function clone_modules(IN unit_id_from int, IN unit_id_to int) 
                    RETURNS TABLE (
                      module_id_to INT, 
                      module_id_from INT
                )
                AS $body$
                begin

                RETURN QUERY
                WITH sel AS (
                   SELECT id, "name", image, "position", uuid, row_number() OVER (ORDER BY id) AS rn
                   FROM public.courses_modules
                   WHERE unit_id=unit_id_from
                   ORDER BY id
                   )
                   , ins AS (
                   INSERT INTO public.courses_modules (created_on, updated_on, uuid, "name", image, "position", unit_id)
                   SELECT NOW(), NOW(), uuid_generate_v4()::text, "name", image, "position", unit_id_to
                   FROM sel ORDER BY id
                   RETURNING id, uuid
                )
                SELECT i.id AS module_id_to, s.id AS module_id_from
                FROM (SELECT id, row_number() OVER (ORDER BY id) AS rn FROM ins) i
                JOIN sel s USING (rn);

                end;
                $body$
                language plpgsql;

                -- clone units
                DROP FUNCTION IF EXISTS clone_units;
                CREATE FUNCTION clone_units(IN curr_id_from INT, IN curr_id_to INT) 
                RETURNS TABLE (
                      unit_id_to INT,
                      unit_id_from INT
                ) 
                AS $body$
                BEGIN

                RETURN QUERY
                WITH sel AS (
                   SELECT id, "name", image, "position", uuid, row_number() OVER (ORDER BY id) AS rn
                   FROM public.courses_units
                   WHERE course_id=curr_id_from
                   ORDER BY id
                   )
                   , ins AS (
                   INSERT INTO public.courses_units (created_on, updated_on, uuid, "name", image, "position", course_id)
                   SELECT NOW(), NOW(), uuid_generate_v4()::text, "name", image, "position", curr_id_to
                   FROM sel ORDER BY id
                   RETURNING id, uuid
                )
                SELECT i.id AS unit_id_to, s.id AS unit_id_from
                FROM (SELECT id, row_number() OVER (ORDER BY id) AS rn FROM ins) i
                JOIN sel s USING (rn);

                END;
                $body$
                language plpgsql;
                """)
