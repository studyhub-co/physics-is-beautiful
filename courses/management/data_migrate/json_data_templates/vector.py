import os
import json


# populate dict with known values
def populate(**kwargs):
    sub_dict = {
        "{{question_text}}": kwargs['question_text'],
    }
    return sub_dict


def insert_values(json_dict, sub_dict):
    for key, value in json_dict.items():
        if value:
            if isinstance(value, dict):  # recursion
                insert_values(value, sub_dict)
            if value in sub_dict.keys():
                json_dict[key] = sub_dict[value]

    # return populated json data
    return json_dict


def get_vector_json_data(**kwargs):
    """
    Get data from Json template with variables

    :param kwargs:
        question_text: text of the question.
    :return: populated JSON data
    """
    args_dict = populate(**kwargs)

    module_dir = os.path.dirname(__file__)
    json_template_path = os.path.join(module_dir, 'vector.json')

    with open(json_template_path) as f:
        data = f.read()
    json_dict = json.loads(data)

    return insert_values(json_dict, args_dict)
