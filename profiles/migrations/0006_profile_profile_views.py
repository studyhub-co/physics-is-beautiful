# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-03-14 08:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_auto_20180911_1204'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='profile_views',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]