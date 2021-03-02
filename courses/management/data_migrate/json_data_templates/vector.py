import os
import json

from .utils import mq

## this version works only with static vars in template
# populate dict with known values
# def populate(**kwargs):
#     # it's work only for static templates
#     sub_dict = {
#         "{{question_text}}": kwargs['question_text'],
#         "{{question_vectors}}": kwargs['question_vectors'],
#        "{{answer_vectors}}": [kwargs['answer_vector'], ],  # in answer we have only the one vector in curriculum
#     }
#
#
#     return sub_dict

#     // {
#     //   angle: 0,
#     //   xComponent: 0,
#     //   yComponent: 0,
#     //   magnitude: 0,
#     // },


# def insert_values(json_dict, sub_dict):
#     for key, value in json_dict.items():
#         if isinstance(value, dict):
#             insert_values(value, sub_dict)
#         elif isinstance(value, list):
#             for item in value:
#                 insert_values(item, sub_dict)
#         elif value in sub_dict.keys():
#             import re
#             # replace whitespaces to support mathquill output
#             # remove MathJax support, we have mathquill Static field
#             val = sub_dict[value]
#             val = re.sub(r'\\\(', '', val)
#             val = re.sub(r'\\\)', '', val)
#             val = re.sub(r'<br>', '', val)
#             val = re.sub(r'\s', '\\\\ ', val)
#             json_dict[key] = val
#
#     # return populated json data
#     return json_dict


def populate_json_data(**kwargs):
    # args_dict = populate(**kwargs)

    module_dir = os.path.dirname(__file__)
    json_template_path = os.path.join(module_dir, 'vector.json.tpl')

    with open(json_template_path) as f:
        data = f.read()

    # escape values / fixme
    question_text = json.dumps(mq(kwargs['question_text']))
    question_vectors = json.dumps(kwargs['question_vectors'])
    answer_vectors = json.dumps(kwargs['answer_vectors'])
    answer_text_only = json.dumps(kwargs['answer_text_only'])
    question_text_only = json.dumps(kwargs['question_text_only'])
    answer_to_check = json.dumps(kwargs['answer_to_check'])
    answer_nullable_vector = json.dumps(kwargs['answer_nullable_vector'])
    answer_vector_is_null = json.dumps(kwargs['answer_vector_is_null'])
    question_hint = json.dumps(mq(kwargs['question_hint']))
    question_image = json.dumps(mq(kwargs['question_image']))
    result = data.format(question_text=question_text,
                         question_vectors=question_vectors,
                         answer_text_only=answer_text_only,
                         answer_vectors=answer_vectors,
                         question_text_only=question_text_only,
                         answer_to_check=answer_to_check,
                         answer_nullable_vector=answer_nullable_vector,
                         answer_vector_is_null=answer_vector_is_null,
                         question_hint=question_hint,
                         question_image=question_image,
                         )
    json_dict = json.loads(result)
    return json_dict

    # return insert_values(json_dict, args_dict)


def get_vector_json_data(question):
    """
    Get data from Json template with variables

    :param question:
        question: question.
    :return: populated JSON data
    """

    # VECTOR_COMPONENTS == Answer text only
    # VECTOR == Question text only
    # NULLABLE_VECTOR == Question text only + Checked Nullable vector
    # + validate - if an answer is null vector - set checked Null vector

    answer_text_only = False

    if question.answer_type_name == 'VECTOR_COMPONENTS':
        answer_text_only = True

    question_text_only = False

    if question.answer_type_name == 'VECTOR':
        question_text_only = True

    answer_nullable_vector = False
    answer_vector_is_null = False

    if question.answer_type_name == 'NULLABLE_VECTOR':
        answer_nullable_vector = True
        if question.correct_answer.content.is_null == True:
            answer_vector_is_null = True

    # 10 = 'Full vector match',
    answer_to_check = 10

    # add answerToCheck
    if question.correct_answer.content.angle\
        and not question.correct_answer.content.x_component\
        and not question.correct_answer.content.y_component:
        # 30 = 'Angle only',
        answer_to_check = 30
    if not question.correct_answer.content.angle\
        and question.correct_answer.content.x_component\
        and question.correct_answer.content.y_component:
        # 20 = 'Magnitude only',
        answer_to_check = 20

    # question vectors
    question_vectors = []
    for vector in question.vectors.all():
        question_vectors.append({
            'angle': vector.angle or 0,
            'xComponent': vector.x_component or 0,
            'yComponent': vector.y_component or 0,
            'magnitude': vector.magnitude or 0,
        })

    answer_vectors = []
    for answer in question.answers.all():
        vector = answer.content
        answer_vectors.append({
            'angle': vector.angle or 0,
            'xComponent': vector.x_component or 0,
            'yComponent': vector.y_component or 0,
            'magnitude': vector.magnitude or 0,
        })

    return populate_json_data(**{
            'question_text': question.text,
            'question_hint': question.hint,
            # 'question_image': question.image,
            'question_image': '',
            'question_vectors': question_vectors,
            'answer_vectors': answer_vectors,
            'answer_text_only': answer_text_only,
            'question_text_only': question_text_only,
            'answer_to_check': answer_to_check,
            'answer_nullable_vector': answer_nullable_vector,
            'answer_vector_is_null': answer_vector_is_null,
        })
