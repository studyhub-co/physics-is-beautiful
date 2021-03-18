import os
from pathlib import Path

from django.core.management.base import BaseCommand
from django.core.files.storage import default_storage

from ...models import JsonDataImage


# FIXME: we need to test this command performance with thousand files
# TODO: if this will too slow, then we need to use documented oriented DataBase to store JSON data of material
# TODO: to able to make complex query (postgresql do not allow this for now)
class Command(BaseCommand):
    help = 'remove unused media storage files'

    # process:
    # 1. iterate over all media files on the file system (storage)
    # 2. check that the file exist in database (e.g. JsonDataImage). (remove file from storage if not).
    # 3. check that the file exist (JsonDataImage) at least in one JsonData of material data.
    # (remove file from storage if not, remove record JsonDataImage also).
    def handle(self, *args, **options):
        # process images listdir
        files = default_storage.listdir('materials_data/images/')[1]  # todo make it imported from model.py
        for file in files:
            file_uuid = Path('1c9e2508-ac8d-4342-9c72-38332b762910.PNG').stem
            image = JsonDataImage.objects.filter(JsonDataImage).first()
            if not image:
                # remove file if it not exist in DB
                default_storage.delete('materials_data/images/{}'.format(file))
        # TODO remove unused JsonDataImage
