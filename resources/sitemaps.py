from django.contrib import sitemaps

from .models import Resource, ResourceProblem, TextBookSolution


class ResourcesViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        return Resource.objects.select_related('metadata').all()

    def location(self, item):
        return item.get_frontend_url()


class TextBookProblemsViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        return ResourceProblem.objects.select_related('textbook_section__resource__metadata').all()

    def location(self, item):
        return item.get_frontend_url()


class TextBookSolutionsViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        return TextBookSolution.objects.select_related('pdf', 'textbook_problem__textbook_section__resource__metadata').all()

    def location(self, item):
        return item.get_frontend_url()
