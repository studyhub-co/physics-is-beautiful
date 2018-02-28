from django.db import models
from django.utils import timezone

from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

from . import BaseModel, Question, Answer


class UserResponseQuerySet(models.QuerySet):

    def create(self, *args, **kwargs):
        kwargs.setdefault('answered_on', timezone.now())
        return super(UserResponseQuerySet, self).create(*args, **kwargs)

    def bulk_create(self, objs, batch_size=None):
        for o in objs:
            if o.answered_on is None:
                o.answered_on = timezone.now()
        return super(UserResponseQuerySet, self).bulk_create(objs, batch_size)


class UserResponse(BaseModel):

    class Meta:
        db_table = 'curricula_user_responses'

    objects = UserResponseQuerySet.as_manager()

    profile = models.ForeignKey(
        'profiles.Profile', related_name='responses', on_delete=models.CASCADE
    )
    question = models.ForeignKey(Question, related_name='responses', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content = GenericForeignKey('content_type', 'object_id')
    answered_on = models.DateTimeField()
    is_correct = models.BooleanField(default=False)

    def answers_list_get(self):
        return self.answers_list_internal

    def answers_list_set(self, value):
        self.answers_list_internal = value

    answers_list = property(answers_list_get, answers_list_set)

    def check_response(self):
        if isinstance(self.content, Answer):
            self.is_correct = self.content.is_correct
        else:
            if not self.answers_list:
                if self.question.correct_answer.matches(self.content):
                    self.is_correct = True
            else:
                # Check several answers
                correct_answers_list = self.question.correct_answer
                # Check lenth arrays equal
                correct = True
                if correct_answers_list.count() == len(self.answers_list):
                    temp_correct_answers_list = list(correct_answers_list)
                    for answer in self.answers_list:
                        for correct_answer in correct_answers_list:
                            if correct_answer.matches(answer):
                                temp_correct_answers_list.remove(correct_answer)
                    # incorrect answer was found
                    if temp_correct_answers_list:
                        correct = False
                else:  # arrays not equal
                    correct = False
                self.is_correct = correct
        return self.is_correct

    def get_correct_answer(self):
        return self.question.correct_answer


