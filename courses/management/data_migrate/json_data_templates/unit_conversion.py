import os
import json

from pint import UnitRegistry

from .utils import mq


def populate_json_data(**kwargs):
    module_dir = os.path.dirname(__file__)
    json_template_path = os.path.join(module_dir, 'unit_converison.json.tpl')

    with open(json_template_path) as f:
        data = f.read()

    # escape values / fixme
    question_text = json.dumps(mq(kwargs['question_text']))
    question_hint = json.dumps(kwargs['question_hint'])
    question_image = json.dumps(mq(kwargs['question_image']))

    question_step_number = json.dumps(kwargs['question_step_number'])
    question_step_unit = json.dumps(mq(kwargs['question_step_unit']))
    question_step_si = json.dumps(kwargs['question_step_si'])
    answer_step_number = json.dumps(kwargs['answer_step_number'])
    answer_step_unit = json.dumps(mq(kwargs['answer_step_unit']))
    answer_step_si = json.dumps(kwargs['answer_step_si'])
    conversion_steps = json.dumps(kwargs['conversion_steps'])
    conversion_type = json.dumps(kwargs['conversion_type'])

    result = data.format(question_text=question_text,
                         question_hint=question_hint,
                         question_image=question_image,
                         question_step_number=question_step_number,
                         question_step_unit=question_step_unit,
                         question_step_si=question_step_si,
                         answer_step_number=answer_step_number,
                         answer_step_unit=answer_step_unit,
                         answer_step_si=answer_step_si,
                         conversion_steps=conversion_steps,
                         conversion_type=conversion_type
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

    ureg = UnitRegistry()
    Q_ = ureg.Quantity

    question_step_si = ''
    if question.correct_answer.content.question_number and \
       question.correct_answer.content.question_unit:
        question_q = Q_('{} {}'.format(
            question.correct_answer.content.question_number,
            question.correct_answer.content.question_unit)
        )
        question_step_si = question_q.to_base_units().magnitude

    answer_step_si = ''
    if question.correct_answer.content.answer_number and \
       question.correct_answer.content.answer_unit:
        answer_q = Q_('{} {}'.format(
            question.correct_answer.content.answer_number,
            question.correct_answer.content.answer_unit)
        )
        answer_step_si = answer_q.to_base_units().magnitude

    answer_number = question.correct_answer.content.answer_number
    answer_unit = question.correct_answer.content.answer_unit

    conversion_steps = []
    # populate conversion_steps
    # { numerator: '1',
    #   denominator: 'km',
    #   numeratorSI: numeratorSI,
    #   denominatorSI: denominatorSI,
    # }
    for conversion_step in question.correct_answer.content.conversion_steps:
        numerator_si = ''
        if conversion_step['numerator']:
            numerator_q = Q_('{}'.format(
                conversion_step['numerator'],
            ))
            numerator_si = numerator_q.to_base_units().magnitude

        denominator_si = ''
        if conversion_step['denominator']:
            denominator_q = Q_('{}'.format(
                conversion_step['denominator'],
            ))
            denominator_si = denominator_q.to_base_units().magnitude

        conversion_steps.append({
           'numerator': conversion_step['numerator'],
           'denominator': conversion_step['denominator'],
           'numeratorSI': numerator_si,
           'denominatorSI': denominator_si
        })

    return populate_json_data(**{
            'question_text': question.text,
            'question_hint': question.hint,
            'question_step_number': question.correct_answer.content.question_number or '',
            'question_step_unit': question.correct_answer.content.question_unit or '',
            'question_step_si': question_step_si,
            'answer_step_number': answer_number or '',
            'answer_step_unit': answer_unit or '',
            'answer_step_si': answer_step_si,
            'question_image': material_question_image_path,
            'conversion_steps': conversion_steps,
            'conversion_type': int(question.correct_answer.content.unit_conversion_type)
        })
