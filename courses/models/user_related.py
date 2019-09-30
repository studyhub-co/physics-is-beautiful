from django.db import models

from . import Course


class CourseUserDashboard(models.Model):
    profile = models.ForeignKey(
        'profiles.Profile', related_name='courses_dashboard', on_delete=models.CASCADE
        # will remove CourseUserDashboard object if a user will be deleted
    )
    course = models.ForeignKey(Course, related_name='user_dashboard', on_delete=models.CASCADE)
    # will remove CourseUserDashboard object if course will be deleted

    class Meta:
        unique_together = (("profile", "course"),)





