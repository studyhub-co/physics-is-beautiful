from ...models.structure import Lesson
from ...models.badges import LessonAwards

from .materials import copy_question


def copy_lesson(module, lesson):
    # copy data
    new_lesson = Lesson()

    # TODO if lesson is a game - then create new lesson + add new material (Game)
    # TODO add evaluatedMathText

    for field in lesson._meta.get_fields():  # True, False?
        if field.name in ('id', 'uuid', 'module', 'lesson_type', 'game', 'assignment',
                          'lessons', 'tagged_items', 'tags', 'lessonawards'):
            continue

        new_field_value = getattr(lesson, field.name)

        # new version required 3 symbols in name at least
        if field.name == 'name' and len(getattr(lesson, field.name)) <= 3:
            new_field_value += ' lesson'

        setattr(new_lesson, field.name, new_field_value)

    new_lesson.module = module
    new_lesson.author = module.author  # old units has no author, so use author from module
    new_lesson.save()

    # copy lesson awards
    module_awards = []
    for award in lesson.lessonawards_set.all():
        new_award = LessonAwards(user=award.user,
                                 lesson=new_lesson,
                                 lesson_completed_award=award.lesson_completed_award
                                 )

        module_awards.append(new_award)

    LessonAwards.objects.bulk_create(module_awards)

    # copy tags
    tags = lesson.tags.names()
    new_lesson.tags.set(*tags, clear=True)

    # set() classroom's assignment
    new_lesson.assignment_set.set(lesson.assignment_set.all(), clear=True)

    # copy questions
    for question in lesson.questions.all():
        copy_question(new_lesson, question)
