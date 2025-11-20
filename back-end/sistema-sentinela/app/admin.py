from django.contrib import admin

from .models import (
    Usuario,
    UnidadedeNegocio,
    Ocorrencia,
)


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'is_staff', 'is_active')
    search_fields = ('email', 'username')


@admin.register(UnidadedeNegocio)
class UnidadedeNegocioAdmin(admin.ModelAdmin):
    list_display = ('cnpj',)


@admin.register(Ocorrencia)
class OcorrenciaAdmin(admin.ModelAdmin):
    list_display = (
        'numero_ocorrencia',
        'unidade_de_negocio',
        'assunto',
        'grau_da_ocorrencia',
        'data_criacao',
    )
    list_filter = ('grau_da_ocorrencia',)

