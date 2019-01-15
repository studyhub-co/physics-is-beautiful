# from django.conf.urls import url

from rest_framework import routers

from .apis import ResourceViewSet, TextBookProblemsViewSet, TextBookSolutionsViewSet, TextBookChaptersViewSet


router = routers.DefaultRouter()
# text book resources
router.register(r'problems', TextBookProblemsViewSet, base_name='problems')
router.register(r'solutions', TextBookSolutionsViewSet, base_name='solutions')
router.register(r'chapters', TextBookChaptersViewSet, base_name='chapters')
# all resources
router.register(r'', ResourceViewSet, base_name='resources')

urlpatterns = router.urls

