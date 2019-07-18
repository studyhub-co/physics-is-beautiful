from __future__ import unicode_literals

from django.db import connection
from django.apps import AppConfig


class CurriculaConfig(AppConfig):
    name = 'curricula'

    def ready(self):
        import curricula.receivers

        # recreate posgres sql clone functions
        with connection.cursor() as cursor:
            cursor.execute("""
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

                -- clone question vectors
                DROP FUNCTION IF EXISTS clone_quesion_vectors;
                CREATE FUNCTION clone_quesion_vectors(IN question_from_id int, 
                                                     IN question_to_id int
                                                     )
                    RETURNS void
                AS $body$
                begin
                WITH ins_vector AS (
                    INSERT INTO public.curricula_vectors (created_on, updated_on, 
                                                          angle, magnitude,
                                                          x_component, y_component) 
                    SELECT NOW(), NOW(), curricula_vectors.angle, curricula_vectors.magnitude,
                    curricula_vectors.x_component, curricula_vectors.y_component
                    FROM public.curricula_vectors
                    LEFT JOIN public.curricula_questions_vectors 
                    ON public.curricula_questions_vectors.vector_id=public.curricula_vectors.id
                    WHERE curricula_questions_vectors.question_id=question_from_id
                    RETURNING id 
                )
                INSERT INTO public.curricula_questions_vectors(vector_id, question_id) 
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
                SELECT model INTO content_type FROM public.django_content_type WHERE id=content_type_id AND app_label='curricula';
                -- 2. Get original content object answer
                CASE content_type
                    WHEN 'text' THEN 
                        INSERT INTO public.curricula_text (created_on, updated_on, text) 
                        SELECT NOW(), NOW(), text 
                        FROM public.curricula_text WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;
                    WHEN 'vector' THEN 
                        INSERT INTO public.curricula_vectors (created_on, updated_on, magnitude, angle, x_component, y_component) 
                        SELECT NOW(), NOW(), magnitude, angle, x_component, y_component 
                        FROM public.curricula_vectors WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;
                    WHEN 'mathematicalexpression' THEN 
                        INSERT INTO public.curricula_mathematical_expressions (created_on, updated_on, representation) 
                        SELECT NOW(), NOW(), representation
                        FROM public.curricula_mathematical_expressions WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;
                    WHEN 'unitconversion' THEN 
                        INSERT INTO public.curricula_unitconversion (created_on, updated_on, answer_number, 
                                                                     answer_unit, conversion_steps, numerator,
                                                                     denominator, question_number, question_unit, 
                                                                     show_answer, unit_conversion_type													 
                                                                    ) 
                        SELECT NOW(), NOW(), answer_number, 
                                                                     answer_unit, conversion_steps, numerator,
                                                                     denominator, question_number, question_unit, 
                                                                     show_answer, unit_conversion_type
                        FROM public.curricula_unitconversion WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;
                    WHEN 'imagewtext' THEN 
                        INSERT INTO public.curricula_image_w_text (created_on, updated_on, "text", image) 
                        SELECT NOW(), NOW(), "text", image
                        FROM public.curricula_image_w_text WHERE id=content_object_id
                        RETURNING id INTO new_content_object_id;
                    WHEN 'mysql' THEN 
                        INSERT INTO public.curricula_mysql (created_on, updated_on, "query_SQL", "schema_SQL", 
                                                            "schema_SQL_json", "text", expected_output_json, schema_is_valid) 
                        SELECT NOW(), NOW(), "query_SQL", "schema_SQL", 
                                                            "schema_SQL_json", "text", expected_output_json, schema_is_valid
                        FROM public.curricula_mysql WHERE id=content_object_id
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
                    FROM public.curricula_answers
                    WHERE question_id=quesion_id_from
                    ORDER BY id
                   )
                   , ins AS (
                    INSERT INTO public.curricula_answers (created_on, updated_on, uuid, "position", question_id, 
                                                          content_type_id, is_correct, object_id)
                    SELECT NOW(), NOW(), SUBSTRING(REPLACE(uuid_generate_v4()::text, '-', '') for 22),  "position", 
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
                   FROM public.curricula_questions
                   WHERE lesson_id=lesson_id_from
                   ORDER BY id
                   )
                   , ins AS (
                   INSERT INTO public.curricula_questions (created_on, updated_on, uuid, "text", hint, image, 
                                                           "position", lesson_id, answer_type, solution_text)
                   SELECT NOW(), NOW(), SUBSTRING(REPLACE(uuid_generate_v4()::text, '-', '') for 22), 
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
                   FROM public.curricula_lessons
                   WHERE module_id=module_id_from
                   ORDER BY id
                   )
                   , ins AS (
                   INSERT INTO public.curricula_lessons (created_on, updated_on, uuid, "name", image, "position", module_id, lesson_type)
                   SELECT NOW(), NOW(), SUBSTRING(REPLACE(uuid_generate_v4()::text, '-', '') for 22), 
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
                   FROM public.curricula_modules
                   WHERE unit_id=unit_id_from
                   ORDER BY id
                   )
                   , ins AS (
                   INSERT INTO public.curricula_modules (created_on, updated_on, uuid, "name", image, "position", unit_id)
                   SELECT NOW(), NOW(), SUBSTRING(REPLACE(uuid_generate_v4()::text, '-', '') for 22), "name", image, "position", unit_id_to
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
                   FROM public.curricula_units
                   WHERE curriculum_id=curr_id_from
                   ORDER BY id
                   )
                   , ins AS (
                   INSERT INTO public.curricula_units (created_on, updated_on, uuid, "name", image, "position", curriculum_id)
                   SELECT NOW(), NOW(), SUBSTRING(REPLACE(uuid_generate_v4()::text, '-', '') for 22), "name", image, "position", curr_id_to
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
