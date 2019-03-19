from badges.utils import MetaBadge
from profiles.models import Profile

from .models import Post


class FirstPost(MetaBadge):
    id = "first-post"
    model = Post
    one_time_only = True

    title = "First Post"
    description = "Makes their first post in Discussion"
    level = "1"
    # ("1", "Bronze"),
    # ("2", "Silver"),
    # ("3", "Gold"),
    # ("4", "Diamond"),

    def check_first_post(self, instance):
        return 1

    def get_user(self, instance):
        return instance.created_by
