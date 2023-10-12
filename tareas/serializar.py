from rest_framework import serializers
from .models import Tareas
from django.contrib.auth.models import User

class TareasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tareas
        fields = ('id', 'titulo', 'descripcion', 'done')
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')