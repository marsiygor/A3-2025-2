from django.contrib import admin

from .models import (
    AreaNegocio,
    EquipeAtendimento,
    Usuario,
    UnidadedeNegocio,
    ContatoCliente,
    Ocorrencia,
)


@admin.register(AreaNegocio)
class AreaNegocioAdmin(admin.ModelAdmin):
    list_display = ('area_de_negocio', 'descricao')


@admin.register(EquipeAtendimento)
class EquipeAtendimentoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'area_de_negocio')


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'is_staff', 'is_active')
    search_fields = ('email', 'username')


@admin.register(UnidadedeNegocio)
class UnidadedeNegocioAdmin(admin.ModelAdmin):
    list_display = ('cnpj', 'email_de_contato')


@admin.register(ContatoCliente)
class ContatoClienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf_cnpj', 'email', 'telefone')


@admin.register(Ocorrencia)
class OcorrenciaAdmin(admin.ModelAdmin):
    list_display = (
        'numero_ocorrencia',
        'unidade_de_negocio',
        'assunto',
        'grau_da_ocorrencia',
        'data_criacao',
    )
    list_filter = ('grau_da_ocorrencia', 'fraudante_utilizou_ia')

