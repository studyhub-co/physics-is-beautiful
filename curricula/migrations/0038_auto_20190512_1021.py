# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-05-12 07:21
from __future__ import unicode_literals

from django.db import migrations, models
import django_light_enums.db


class Migration(migrations.Migration):

    dependencies = [
        ('curricula', '0037_auto_20190419_0850'),
    ]

    operations = [
        migrations.CreateModel(
            name='Text',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('text', models.TextField(blank=True)),
            ],
            options={
                'db_table': 'curricula_text',
            },
        ),
        migrations.AlterField(
            model_name='lesson',
            name='lesson_type',
            field=django_light_enums.db.EnumField(choices=[(0, 'DEFAULT'), (1, 'GAME')], default=0, enum_values=(0, 1)),
        ),
        migrations.AlterField(
            model_name='lessonprogress',
            name='status',
            field=django_light_enums.db.EnumField(choices=[(0, 'LOCKED'), (10, 'NEW'), (20, 'UNLOCKED'), (30, 'COMPLETE')], default=0, enum_values=(0, 10, 20, 30)),
        ),
        migrations.AlterField(
            model_name='question',
            name='answer_type',
            field=django_light_enums.db.EnumField(choices=[(100, 'MULTIPLE_CHOICE'), (110, 'MULTISELECT_CHOICE'), (20, 'VECTOR'), (30, 'NULLABLE_VECTOR'), (50, 'MATHEMATICAL_EXPRESSION'), (60, 'VECTOR_COMPONENTS'), (70, 'UNIT_CONVERSION'), (80, 'TEXT')], default=20, enum_values=(100, 110, 20, 30, 50, 60, 70, 80)),
        ),
        migrations.AlterField(
            model_name='question',
            name='text',
            field=models.CharField(db_index=True, max_length=2048),
        ),
    ]