from ...models import Material, MaterialProblemType, JsonDataImage

from .json_data_templates.vector import get_vector_json_data
from .json_data_templates.qa_base import get_qa_base_json_data


def copy_question(lesson, question):
    # copy data
    new_material = Material()
    for field in question._meta.get_fields():  # True, False?
        if field.name in ('id', 'uuid', 'lesson', 'tagged_items', 'tags', 'text'):
            continue

        new_field_value = getattr(question, field.name)

        # new version required 3 symbols in name at least
        # if field.name == 'name' and len(getattr(question, field.name)) <= 3:
        #     new_field_value += ' material'

        setattr(new_material, field.name, new_field_value)

    new_material.name = question.text if len(question.text) > 3 else question.text + ' material'
    new_material.lesson = lesson
    new_material.author = lesson.author  # old units has no author, so use author from lesson

    # we need to save material to get UUID for saving Image
    new_material.save()

    material_question_image_path = ''

    # copy question image
    if question.image:
        try:
            from django.core.files.base import ContentFile, File

            new_image = ContentFile(question.image.read()),
            new_image_name = question.image.name

            material_question_image = JsonDataImage.objects.create(
                material=new_material,
                # image=new_image,
                author=new_material.author,
                name=question.image.name
            )
            # material_question_image.image.save(question.image.name, File(open(question.image.url, "w")))
            # new_image.read()
            material_question_image.image.save(new_image_name, new_image[0], save=True)
            # material_question_image.save()
            material_question_image_path = material_question_image.image.url
        except FileNotFoundError:
            # TODO generate a report for administrators with information about not found files
            pass

    # set material problem type by name, e.g. 'Vector official' = Vector
    if question.answer_type_name in ('VECTOR_COMPONENTS', 'VECTOR', 'NULLABLE_VECTOR'):
        new_material.data = get_vector_json_data(question)
        mpt = MaterialProblemType.objects.filter(name='Vector official').first()
        if not mpt:
            assert False, 'there is no MaterialProblemType for VECTOR_COMPONENTS or VECTOR or NULLABLE_VECTOR types'
        new_material.material_problem_type = mpt
    elif question.answer_type_name in ('MATHEMATICAL_EXPRESSION', 'TEXT'):
        new_material.data = get_qa_base_json_data(question, material_question_image_path)
        mpt = MaterialProblemType.objects.filter(name='Q&A Base official').first()
        new_material.material_problem_type = mpt
    else:
        pass
        # Uncomment this when we will check all answers types
        # assert False, 'Unknown '

    new_material.save()
