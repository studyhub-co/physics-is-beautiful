
from django.template import loader
from django.core.mail import EmailMessage
from django.conf import settings


class ContactSerializer:
    @staticmethod
    def send_email(cleaned_form_data):
        html_message = loader.render_to_string(
            'homepage/notification_email.html',
            {
                'name': cleaned_form_data['name'],
                'email': cleaned_form_data['email'],
                'message': cleaned_form_data['message']
            }
        )

        email = EmailMessage(
            '[PiB Contact] from ' + cleaned_form_data['name'] + '<' + cleaned_form_data['email'] + '>',
            html_message,
            settings.DEFAULT_FROM_EMAIL,
            ['hello@physicsisbeautiful.com']
        )
        email.content_subtype = "html"

        # Suppress email until it's fixed.
        email.send()
