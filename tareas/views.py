from rest_framework import viewsets, permissions, generics
from .serializar import TareasSerializer
from .models import Tareas
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .serializar import UserSerializer
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer 

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        response_data = {
            'token': token,
            'user_id': user.id,
            'email': user.email
        }
        return Response(response_data)

    def perform_create(self, serializer):
        return serializer.save()

class TareasView(viewsets.ModelViewSet):
    serializer_class = TareasSerializer
    queryset = Tareas.objects.all()
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    
class UserRegistrationView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ()
    authentication_classes = ()

    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email') 
        
        if username is None or password is None or email is None:
            return Response({'error': 'Por favor ingresa un usuario, contraseña y correo electrónico.'}, status=status.HTTP_400_BAD_REQUEST)

        # Verifica si el usuario ya existe
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Usuario ya existe.'}, status=status.HTTP_400_BAD_REQUEST)

        # Verifica si el correo electrónico ya existe
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Correo electrónico ya registrado.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)  # Crea el usuario con correo electrónico

        if user:
            # Genera un token JWT y lo devuelve en la respuesta
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return Response({'token': token}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'No se puede crear usuario.'}, status=status.HTTP_400_BAD_REQUEST)

