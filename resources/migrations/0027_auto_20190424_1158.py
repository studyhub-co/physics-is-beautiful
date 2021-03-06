# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-04-24 08:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0026_auto_20190418_1154'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='TextBookProblem',
            new_name='ResourceProblem',
        ),
        migrations.AlterModelOptions(
            name='resourceproblem',
            options={},
        ),
        migrations.AlterField(
            model_name='resource',
            name='resource_type',
            field=models.CharField(choices=[('TB', 'textbook'), ('TS', 'standardized test')], default='TB', max_length=2),
        ),
    ]
