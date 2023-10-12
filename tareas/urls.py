from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from tareas import views

router = routers.DefaultRouter()
router.register(r'tareas', views.TareasView, 'tareas')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('api/register/', views.UserRegistrationView.as_view(), name='register'),
    path('docs/', include_docs_urls(title="API de tareas"))
]