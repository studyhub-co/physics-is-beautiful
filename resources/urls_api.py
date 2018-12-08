from rest_framework import routers

from .apis import ResourceViewSet, TextBookProblemsViewSet


router = routers.DefaultRouter()
router.register(r'problems', TextBookProblemsViewSet, base_name='problems')
router.register(r'', ResourceViewSet, base_name='resources')


urlpatterns = router.urls


