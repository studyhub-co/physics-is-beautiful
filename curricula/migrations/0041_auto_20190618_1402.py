# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-06-18 11:02
from __future__ import unicode_literals

from django.db import migrations, models
import django_light_enums.db


class Migration(migrations.Migration):

    dependencies = [
        ('curricula', '0040_auto_20190613_1855'),
    ]

    operations = [
        migrations.CreateModel(
            name='MySQL',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('text', models.TextField()),
                ('schema_SQL', models.TextField()),
                ('query_SQL', models.TextField()),
            ],
            options={
                'db_table': 'curricula_mysql',
            },
        ),
    ]
