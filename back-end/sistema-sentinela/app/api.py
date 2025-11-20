from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    Usuario,
    UnidadedeNegocio,
    Ocorrencia,
)
from .serializers import (
    UsuarioSerializer,
    UnidadedeNegocioSerializer,
    OcorrenciaSerializer,
)


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]


class UnidadedeNegocioViewSet(viewsets.ModelViewSet):
    queryset = UnidadedeNegocio.objects.all()
    serializer_class = UnidadedeNegocioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class OcorrenciaViewSet(viewsets.ModelViewSet):
    queryset = Ocorrencia.objects.all().order_by('-data_criacao')
    serializer_class = OcorrenciaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # numero_ocorrencia é gerenciado pelo modelo; apenas salvar
        serializer.save()
