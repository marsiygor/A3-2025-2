from rest_framework import serializers
from .models import (
    AreaNegocio,
    EquipeAtendimento,
    Usuario,
    UnidadedeNegocio,
    ContatoCliente,
    Ocorrencia,
)


class AreaNegocioSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaNegocio
        fields = ['guid', 'area_de_negocio', 'descricao']


class EquipeAtendimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipeAtendimento
        fields = ['guid', 'titulo', 'area_de_negocio', 'descricao']


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['guid', 'username', 'email', 'first_name', 'last_name', 'area_de_negocio', 'cargo', 'equipe_atendimento', 'gerente', 'is_staff', 'is_active']
        read_only_fields = ['guid', 'is_staff', 'is_active']


class UnidadedeNegocioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadedeNegocio
        fields = ['guid', 'cnpj', 'email_de_contato', 'contato', 'proprietario', 'descricao']


class ContatoClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContatoCliente
        fields = ['guid', 'cpf_cnpj', 'nome', 'data_de_nascimento', 'unidade_de_negocio', 'email', 'telefone', 'proprietario', 'descricao']


class OcorrenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ocorrencia
        fields = ['guid', 'cpf_cnpj_relacionado', 'unidade_de_negocio', 'numero_ocorrencia', 'assunto', 'resposta_da_area', 'grau_da_ocorrencia', 'fraudante_utilizou_ia', 'descricao', 'proprietario', 'data_criacao', 'data_atualizacao']
        read_only_fields = ['guid', 'numero_ocorrencia', 'data_criacao', 'data_atualizacao']
