from django.contrib import admin
from django.urls import path
from back.views import signup , signin , WeatherView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', signup, name='signup'),
    path('api/login/', signin, name='signin'),
    path('weather/', WeatherView.as_view(), name='weather'),
  
     
]
