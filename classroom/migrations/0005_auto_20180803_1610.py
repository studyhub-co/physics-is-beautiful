# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-08-03 13:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classroom', '0004_auto_20180801_2018'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='name',
            field=models.CharField(default='assignment', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='assignment',
            name='updated_on',
            field=models.DateTimeField(auto_now=True),
        ),
    ]