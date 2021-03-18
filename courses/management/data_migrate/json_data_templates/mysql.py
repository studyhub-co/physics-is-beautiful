import os
import json

from .utils import mq


def populate_json_data(**kwargs):
    module_dir = os.path.dirname(__file__)
    json_template_path = os.path.join(module_dir, 'mysql.json.tpl')

    with open(json_template_path) as f:
        data = f.read()

    # escape values / fixme
    question_text = json.dumps(mq(kwargs['question_text']))
    question_hint = json.dumps(kwargs['question_hint'])
    question_image = json.dumps(mq(kwargs['question_image']))
    expected_output = json.dumps(mq(kwargs['expected_output']))
    expected_output_json = json.dumps(mq(kwargs['expected_output_json']))
    sql_query = json.dumps(mq(kwargs['sql_query']))
    sql_schema = json.dumps(mq(kwargs['sql_schema']))

    result = data.format(question_text=question_text,
                         question_hint=question_hint,
                         question_image=question_image,
                         expected_output=expected_output,
                         expected_output_json=expected_output_json,
                         sql_query=sql_query,
                         sql_schema=sql_schema,
                         )
    json_dict = json.loads(result)
    return json_dict

    # return insert_values(json_dict, args_dict)


def get_qa_base_json_data(question, material_question_image_path):
    """
    Get data from Json template with variables

    :param question:
        question: question.
    :param material_question_image_path: question image path.
    :return: populated JSON data
    """

    answer = question.correct_answer.content

    return populate_json_data(**{
            'question_text': question.text,
            'question_hint': question.hint,
            'question_image': material_question_image_path,
        })
