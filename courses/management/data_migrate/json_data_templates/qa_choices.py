import os
import json
import uuid

from .utils import mq
from ....models import JsonDataImage


def populate_json_data(**kwargs):
    module_dir = os.path.dirname(__file__)
    json_template_path = os.path.join(module_dir, 'qa_choices.json.tpl')

    with open(json_template_path) as f:
        data = f.read()

    # escape values / fixme
    question_text = json.dumps(mq(kwargs['question_text']))
    choices_list = json.dumps(kwargs['choices_list'])
    question_hint = json.dumps(mq(kwargs['question_hint']))
    question_image = json.dumps(mq(kwargs['question_image']))
    multi_select_mode = json.dumps(kwargs['multi_select_mode'])

    result = data.format(question_text=question_text,
                         choices_list=choices_list,
                         question_hint=question_hint,
                         question_image=question_image,
                         multi_select_mode=multi_select_mode,
                         )
    json_dict = json.loads(result)
    return json_dict


def get_qa_choices_json_data(question, material_question_image_path, new_material):
    """
    Get data from Json template with variables

    :param question:
        question: question.
    :param material_question_image_path: question image path.
    :return: populated JSON data
    """

    multi_select_mode = False

    if question.answer_type_name == 'MULTISELECT_CHOICE':
        multi_select_mode = True

    #  add choices
    choices_list = []

    for choice in question.answers.all():
        choice_image_path = ''
        # copy choice image
        if choice.content.image:
            try:
                from django.core.files.base import ContentFile, File

                new_image = ContentFile(choice.content.image.read()),
                new_image_name = choice.content.image.name

                choice_image = JsonDataImage.objects.create(
                    material=new_material,
                    author=new_material.author,
                    name=choice.content.image.name
                )
                choice_image.image.save(new_image_name, new_image[0], save=True)
                choice_image_path = choice_image.image.url
            except FileNotFoundError:
                # generate a report for administrators with information about not found files
                module_dir = os.path.dirname(__file__)
                log_file = os.path.join(module_dir, 'choices_images_not_found.log')
                with open(log_file, 'a') as new_file:
                    new_file.write('{} / {}\n'.format(choice.content.id, choice.content.image.name))

        choices_list.append({
            "content": {
                "image": choice_image_path,
                "text": choice.content.text
            },
            "selected": choice.is_correct,
            "hiddenFields": {
                "selected": False
             },
            "type": "base",
            "uuid": str(uuid.uuid4()),
            "position": 0,
            "reactionResult": "none"
        })

    #       {{
    #          "content":{{
    #             "image":"",
    #             "text":"1st choice"
    #          }},
    #          "selected":true,
    #          "hiddenFields":{{
    #             "selected":false
    #          }},
    #          "type":"base",
    #          "uuid":uuidV4(),
    #          "position":0,
    #          "reactionResult":"none"
    #       }},

    return populate_json_data(**{
            'question_text': question.text,
            'question_hint': question.hint,
            'question_image': material_question_image_path,
            'choices_list': choices_list,
            'multi_select_mode': multi_select_mode
        })
