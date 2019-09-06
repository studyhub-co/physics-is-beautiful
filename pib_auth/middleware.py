from datetime import timedelta as td
from datetime import datetime
import time

try:
    from django.utils.deprecation import MiddlewareMixin
except ImportError:
    # Not required for Django <= 1.9, see:
    # https://docs.djangoproject.com/en/1.10/topics/http/middleware/#upgrading-pre-django-1-10-style-middleware
    MiddlewareMixin = object

from django.conf import settings
from django.utils import timezone

from .models import User


class LastUserActivityMiddleware(MiddlewareMixin):
    KEY = "last-activity"

    def process_request(self, request):
        # if request.user.is_authenticated: # django 1.11.20
        if request.user.is_authenticated:
            last_activity = request.session.get(self.KEY)
            last_activity_date = None

            if last_activity:
                last_activity_date = datetime.fromtimestamp(last_activity, timezone.utc)

            # If key is old enough, update database.
            too_old_time = timezone.now() - td(seconds=settings.USER_LAST_ACTIVITY_INTERVAL_SECS)
            if not last_activity_date or last_activity_date < too_old_time:
                User.objects.filter(id=request.user.pk).update(last_activity=timezone.now())

            # request.session[self.KEY] = time.mktime(timezone.now().timetuple())
            request.session[self.KEY] = (timezone.now() - datetime(1970, 1, 1).replace(tzinfo=timezone.utc)).total_seconds()
        return None
