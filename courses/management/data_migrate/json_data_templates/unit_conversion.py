import os
import json

from .utils import mq


def populate_json_data(**kwargs):
    module_dir = os.path.dirname(__file__)
    json_template_path = os.path.join(module_dir, 'unit_converison.json.tpl')

    with open(json_template_path) as f:
        data = f.read()

    # escape values / fixme
    question_text = json.dumps(mq(kwargs['question_text']))
    question_hint = json.dumps(mq(kwargs['question_hint']))
    if kwargs['question_image']:
        pass
    question_image = json.dumps(mq(kwargs['question_image']))

    result = data.format(question_text=question_text,
                         question_hint=question_hint,
                         question_image=question_image,
                         )
    json_dict = json.loads(result)
    return json_dict


def get_unit_conversion_json_data(question, material_question_image_path):
    """
    Get data from Json template with variables

    :param question:
        question: question.
    :param material_question_image_path: question image path.
    :return: populated JSON data
    """

    conversion_steps = []

    return populate_json_data(**{
            'question_text': question.text,
            'question_hint': question.hint,
            'question_image': material_question_image_path,
            'conversion_steps': conversion_steps
        })
