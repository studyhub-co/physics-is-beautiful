# from django.conf.urls import url

from rest_framework import routers

from .apis import ResourceViewSet, ResourceProblemsViewSet, TextBookSolutionsViewSet, TextBookChaptersViewSet


router = routers.DefaultRouter()
# text book resources
router.register(r'problems', ResourceProblemsViewSet, basename='problems')
router.register(r'solutions', TextBookSolutionsViewSet, basename='solutions')
router.register(r'chapters', TextBookChaptersViewSet, basename='chapters')
# router.register(r'ads', TextBookAdViewSet, basename='ads')
# all resources
router.register(r'', ResourceViewSet, basename='resources')

urlpatterns = router.urls

