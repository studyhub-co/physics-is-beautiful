import os
import json

from .utils import mq


def populate_json_data(**kwargs):
    module_dir = os.path.dirname(__file__)
    json_template_path = os.path.join(module_dir, 'qa_base.json.tpl')

    with open(json_template_path) as f:
        data = f.read()

    # escape values / fixme
    question_text = json.dumps(mq(kwargs['question_text']))
    answer_text = json.dumps(mq(kwargs['answer_text']))
    question_hint = json.dumps(mq(kwargs['question_hint']))
    question_image = json.dumps(mq(kwargs['question_image']))

    result = data.format(question_text=question_text,
                         answer_text=answer_text,
                         question_hint=question_hint,
                         question_image=question_image,
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

    if question.answer_type_name == 'MATHEMATICAL_EXPRESSION':
        answer_text = question.correct_answer.content.representation
    else:
        answer_text = question.correct_answer.content.text

    return populate_json_data(**{
            'question_text': question.text,
            'question_hint': question.hint,
            'question_image': material_question_image_path,
            'answer_text': answer_text,
        })
