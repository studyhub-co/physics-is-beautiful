# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
# import jsonfield.fields
import django.contrib.postgres.fields


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0002_auto_20150224_1134'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='data',
            # field=jsonfield.fields.JSONField(null=True, blank=True),
            field=django.contrib.postgres.fields.JSONField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
