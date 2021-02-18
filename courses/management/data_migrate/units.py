from ...models.structure import Unit

from .modules import copy_module


def copy_unit(course, unit):
    # 1. copy data
    new_unit = Unit()
    for field in unit._meta.get_fields():  # True, False?
        if field.name in ('id', 'uuid', 'curricula', 'modules', 'tagged_items', 'tags'):
            continue

        new_field_value = getattr(unit, field.name)

        # new version required 3 symbols in name at least
        if field.name == 'name' and len(getattr(unit, field.name)) <= 3:
            new_field_value += ' unit'

        setattr(new_unit, field.name, new_field_value)

    new_unit.course = course
    new_unit.author = course.author  # old units has no author, so use author from curricula
    new_unit.save()

    # copy tags
    tags = unit.tags.names()
    new_unit.tags.set(*tags, clear=True)

    # copy modules
    for module in unit.modules.all():
        copy_module(new_unit, module)
