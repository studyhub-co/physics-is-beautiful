from django.contrib import admin

from .models import Classroom


class StudentsInline(admin.TabularInline):
    model = Classroom.students.through


class ClassroomAdmin(admin.ModelAdmin):
    inlines = (StudentsInline,)


admin.site.register(Classroom, ClassroomAdmin)

