from rest_framework import serializers
from .models import (
    Usuario,
    UnidadedeNegocio,
    Ocorrencia,
)


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['guid', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']
        read_only_fields = ['guid', 'is_staff', 'is_active']


class UnidadedeNegocioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadedeNegocio
        fields = ['guid', 'cnpj', 'nome', 'endereco']


class OcorrenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ocorrencia
        fields = [
            'guid',
            'unidade_de_negocio',
            'cpf_cnpj_relacionado',
            'assunto',
            'tipo_fraude',
            'data_nascimento',
            'descricao',
            'grau_da_ocorrencia',
            'fraudante_utilizou_ia',
            'numero_ocorrencia',
            'data_criacao',
            'data_atualizacao'
        ]
        read_only_fields = ['numero_ocorrencia', 'data_criacao', 'data_atualizacao']
