from __future__ import unicode_literals

from django.apps import AppConfig


class CurriculaConfig(AppConfig):
    name = 'curricula'

    def ready(self):
        import curricula.receivers
