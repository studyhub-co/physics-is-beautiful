from ...models.structure import Module
from ...models.badges import ModuleAwards

from .lessons import copy_lesson


def copy_module(unit, module):
    # copy data
    new_module = Module()
    for field in module._meta.get_fields():  # True, False?
        if field.name in ('id', 'uuid', 'unit', 'lessons', 'tagged_items', 'tags', 'moduleawards'):
            continue

        new_field_value = getattr(module, field.name)

        # new version required 3 symbols in name at least
        if field.name == 'name' and len(getattr(module, field.name)) <= 3:
            new_field_value += ' module'

        setattr(new_module, field.name, new_field_value)

    new_module.unit = unit
    new_module.author = unit.author  # old units has no author, so use author from unit
    new_module.save()

    # copy module awards
    module_awards = []
    for award in module.moduleawards_set.all():
        new_award = ModuleAwards(user=award.user,
                                 module=new_module,
                                 module_finished_badge=award.module_finished_badge,
                                 module_completed_award=award.module_completed_award
                                 )

        module_awards.append(new_award)

    ModuleAwards.objects.bulk_create(module_awards)

    # copy tags
    tags = module.tags.names()
    new_module.tags.set(*tags, clear=True)

    # copy lessons
    for lesson in module.lessons.all():
        copy_lesson(new_module, lesson)
