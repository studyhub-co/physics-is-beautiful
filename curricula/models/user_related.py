from django.db import models

from . import BaseModel, Curriculum


class CurriculumUserDashboard(BaseModel):
    profile = models.ForeignKey(
        'profiles.Profile', related_name='dashboard_curricula', on_delete=models.CASCADE
        # will remove row if user will be delete
    )
    curriculum = models.ForeignKey(Curriculum, related_name='curricula_user_dashboard', on_delete=models.CASCADE)
    # will remove row if curriculum will be delete

    # updated_on - will be update when user complete lesson
    # remove fom dashboard will remove CurriculumDashboard object
    class Meta:
        unique_together = (("profile", "curriculum"),)
        db_table = 'curricula_userdashboard'





