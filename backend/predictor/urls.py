from django.urls import path
from .views import predict_disease,prescribe_disease

urlpatterns = [
    path('', predict_disease, name='predict_disease'),
    path('prescribe/', prescribe_disease),
]
