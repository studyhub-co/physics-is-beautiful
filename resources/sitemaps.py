from django.contrib import sitemaps

from .models import Resource, TextBookProblem, TextBookSolution


class ResourcesViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        return Resource.objects.all()

    def location(self, item):
        return item.get_frontend_url()


class TextBookProblemsViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        return TextBookProblem.objects.select_related('textbook_section__resource').all()

    def location(self, item):
        return item.get_frontend_url()


class TextBookSolutionsViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        return TextBookSolution.objects.select_related('textbook_problem__textbook_section__resource').all()

    def location(self, item):
        return item.get_frontend_url()
