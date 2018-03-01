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
                new_text = ImageWText.objects.create(text=text.text)

                question = answer.question

                question.answer_type = answer.question.AnswerType.MULTIPLE_CHOICE
                question.save()  # here is all answers are removed
                # text.delete()

                # create new answer
                Answer.objects.create(content_type=ct_txt_img, object_id=new_text.id, question=question)

            except Answer.DoesNotExist:  # we store users texts also
                pass

        for img in imgs:

            ct = ContentType.objects.get_for_model(img)
            try:
                answer = Answer.objects.get(content_type=ct, object_id=img.id)

                new_img = ImageWText.objects.create(image=img.image)

                question = answer.question

                question.answer_type = answer.question.AnswerType.MULTIPLE_CHOICE
                question.save()  # here is all answers are removed
                # img.delete()

                # create new answer
                Answer.objects.create(content_type=ct_txt_img, object_id=new_img.id, question=question)

            except Answer.DoesNotExist:
                pass
