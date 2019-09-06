from django.contrib import admin

from .models import Classroom


class StudentsInline(admin.TabularInline):
    model = Classroom.students.through
    list_select_related = ('student__user',)
    raw_id_fields = ('student',)


class ClassroomAdmin(admin.ModelAdmin):
    list_select_related = ('teacher__user', )
    inlines = (StudentsInline,)
    raw_id_fields = ('teacher', 'curriculum')

    def get_queryset(self, request):
        return super(ClassroomAdmin, self).get_queryset(request).prefetch_related('students__user')


admin.site.register(Classroom, ClassroomAdmin)

