from django.db import models

from . import BaseModel, Curriculum


class CurriculumUserDashboard(BaseModel):
    profile = models.ForeignKey(
        'profiles.Profile', related_name='dashboard_curricula', on_delete=models.CASCADE
        # will remove CurriculumUserDashboard object if a user will be deleted
    )
    curriculum = models.ForeignKey(Curriculum, related_name='curricula_user_dashboard', on_delete=models.CASCADE)
    # will remove CurriculumUserDashboard object if curriculum will be deleted

    # updated_on - will be updated when a user completed a lesson

    class Meta:
        unique_together = (("profile", "curriculum"),)
        db_table = 'curricula_userdashboard'





