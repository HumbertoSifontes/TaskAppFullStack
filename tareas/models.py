from django.db import models

# Create your models here.

class Tareas(models.Model):
    titulo = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    
    def __str__(self):
        return self.titulo
    
class User(models.Model):
    username = models.CharField(max_length=150)
    password = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
