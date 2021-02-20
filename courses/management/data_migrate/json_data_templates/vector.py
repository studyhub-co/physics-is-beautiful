import os
import json


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


def mq(val):
    """
    convert to mathquill text
    :param val:
    :return:
    """
    import re
    # replace whitespaces to support mathquill output
    # remove MathJax support, we have mathquill Static field
    val = re.sub(r'\\\(', '', val)
    val = re.sub(r'\\\)', '', val)
    val = re.sub(r'<br>', '', val)
    val = re.sub(r'\s', '\\\\ ', val)
    return val


def get_vector_json_data(**kwargs):
    """
    Get data from Json template with variables

    :param kwargs:
        question_text: text of the question.
    :return: populated JSON data
    """
    # args_dict = populate(**kwargs)

    module_dir = os.path.dirname(__file__)
    json_template_path = os.path.join(module_dir, 'vector.json.tpl')

    with open(json_template_path) as f:
        data = f.read()

    # escape values
    question_text = json.dumps(mq(kwargs['question_text']))
    question_vectors = json.dumps(kwargs['question_vectors'])
    result = data.format(question_text=question_text, question_vectors=question_vectors)
    json_dict = json.loads(result)
    return json_dict

    # return insert_values(json_dict, args_dict)

