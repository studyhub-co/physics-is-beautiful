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

    def check_response(self):
        if isinstance(self.content, Answer):
            self.is_correct = self.content.is_correct
        else:
            if self.question.correct_answer.matches(self.content):
                self.is_correct = True
        return self.is_correct

    def get_correct_answer(self):
        return self.question.correct_answer


