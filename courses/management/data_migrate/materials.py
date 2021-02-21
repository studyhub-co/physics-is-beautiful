from ...models.material import Material, MaterialProblemType

from .json_data_templates.vector import get_vector_json_data


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

    # TODO add answerToCheck
    # 10 = 'Full vector match',
    # 20 = 'Magnitude only',
    # 10 = 'Angle only',

    # set material problem type by name, e.g. 'Vector official' = Vector
    if question.answer_type_name in ('VECTOR_COMPONENTS', 'VECTOR', 'NULLABLE_VECTOR'):
        new_material.data = get_vector_json_data(question)
        mpt = MaterialProblemType.objects.filter(name='Vector official').first()
        if not mpt:
            assert False, 'there is no MaterialProblemType for VECTOR_COMPONENTS or VECTOR or NULLABLE_VECTOR types'
        new_material.material_problem_type = mpt
    else:
        pass
        # Uncomment this when we will check all answers types
        # assert False, 'Unknown '

    new_material.save()
