from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import api

router = DefaultRouter()
router.register(r'areanegocio', api.AreaNegocioViewSet)
router.register(r'equipeatendimento', api.EquipeAtendimentoViewSet)
router.register(r'usuarios', api.UsuarioViewSet)
router.register(r'unidadedenegocio', api.UnidadedeNegocioViewSet)
router.register(r'contatos', api.ContatoClienteViewSet)
router.register(r'ocorrencias', api.OcorrenciaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
