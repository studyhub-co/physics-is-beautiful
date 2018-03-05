from django.core.management.base import BaseCommand, CommandError
from curricula.models import Text, Image, ImageWText, Answer

from django.contrib.contenttypes.models import ContentType


class Command(BaseCommand):
    help = 'Copy text and image models to ImgWTex'

    def handle(self, *args, **options):
        ct_txt_img = ContentType.objects.get_for_model(ImageWText)

        texts = Text.objects.all()
        imgs = Image.objects.all()

        for text in texts:
            ct = ContentType.objects.get_for_model(text)
            try:
                answer = Answer.objects.get(content_type=ct, object_id=text.id)

                question = answer.question

                if question.answer_type != answer.question.AnswerType.MULTIPLE_CHOICE:
                    question.answer_type = answer.question.AnswerType.MULTIPLE_CHOICE

                    # collect all old answers
                    oldanswers = []
                    for answer in question.answers.all():
                        oldanswers.append(answer)

                    # here is all old answers are removed
                    question.save()

                    # create new answers
                    for oldanswer in oldanswers:
                        old_text = Text.objects.get(pk=oldanswer.object_id)
                        new_text = ImageWText.objects.create(text=old_text.text)
                        # create new answer
                        Answer.objects.create(content_type=ct_txt_img, object_id=new_text.id,
                                              question=question, is_correct=oldanswer.is_correct,
                                              position=oldanswer.position)

            except Answer.DoesNotExist:  # we store users texts also
                pass

        for img in imgs:

            ct = ContentType.objects.get_for_model(img)
            try:
                answer = Answer.objects.get(content_type=ct, object_id=img.id)

                question = answer.question
                if question.answer_type != answer.question.AnswerType.MULTIPLE_CHOICE:
                    question.answer_type = answer.question.AnswerType.MULTIPLE_CHOICE

                    # collect all old answers
                    oldanswers = []
                    for answer in question.answers.all():
                        oldanswers.append(answer)

                    # here is all old answers are removed
                    question.save()

                    # create new answers
                    for oldanswer in oldanswers:
                        old_img = Image.objects.get(pk=oldanswer.object_id)
                        new_img = ImageWText.objects.create(image=old_img.image)
                        # create new answer
                        Answer.objects.create(content_type=ct_txt_img, object_id=new_img.id,
                                              question=question, is_correct=oldanswer.is_correct,
                                              position=oldanswer.position)

            except Answer.DoesNotExist:
                pass
