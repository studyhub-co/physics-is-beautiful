# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-09-08 14:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classroom', '0014_externalclassroom_alternate_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='send_email',
            field=models.BooleanField(default=True),
        ),
    ]
