from django.contrib import sitemaps

from .models import Curriculum


class CurriculaViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        return Curriculum.objects.all()

    def location(self, item):
        return item.get_frontend_url()
