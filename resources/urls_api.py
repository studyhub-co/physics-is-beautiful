# from django.conf.urls import url

from rest_framework import routers

from .apis import ResourceViewSet, ResourceProblemsViewSet, TextBookSolutionsViewSet, TextBookChaptersViewSet


router = routers.DefaultRouter()
# text book resources
router.register(r'problems', ResourceProblemsViewSet, base_name='problems')
router.register(r'solutions', TextBookSolutionsViewSet, base_name='solutions')
router.register(r'chapters', TextBookChaptersViewSet, base_name='chapters')
# router.register(r'ads', TextBookAdViewSet, base_name='ads')
# all resources
router.register(r'', ResourceViewSet, base_name='resources')

urlpatterns = router.urls

