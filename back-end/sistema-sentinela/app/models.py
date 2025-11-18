from django.db import models

import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.conf import settings



class AreaNegocio(models.Model):
    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    area_de_negocio = models.CharField(max_length=20, unique=True)
    descricao = models.TextField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.area_de_negocio
    
    
class EquipeAtendimento(models.Model):
    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=100)
    area_de_negocio = models.ForeignKey(AreaNegocio, on_delete=models.PROTECT)
    descricao = models.TextField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.titulo
    
    
class Usuario(AbstractUser):
    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    area_de_negocio = models.ForeignKey(AreaNegocio, on_delete=models.PROTECT, blank=True, null=True)
    cargo = models.CharField(max_length=100, blank=True, null=True)
    equipe_atendimento = models.ForeignKey(EquipeAtendimento, on_delete=models.PROTECT, blank=True, null=True)
    gerente = models.ForeignKey('self', on_delete=models.PROTECT, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    descricao = models.TextField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.email
    
class UnidadedeNegocio(models.Model): 
    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cnpj = models.CharField(max_length=14, unique=True)
    email_de_contato = models.EmailField(blank=True, null=True)
    contato = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='unidades_de_negocio_contato')
    proprietario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='unidades_de_negocio_proprietario')
    descricao = models.TextField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.cnpj


class ContatoCliente(models.Model):
    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cpf_cnpj = models.CharField(max_length=14, unique=True)
    nome = models.CharField(max_length=100)
    data_de_nascimento = models.DateField(blank=True, null=True)
    unidade_de_negocio = models.ForeignKey(UnidadedeNegocio, on_delete=models.SET_NULL, null=True, blank=True, related_name='contatos')
    email = models.EmailField(blank=True, null=True)
    telefone = models.CharField(max_length=15, blank=True, null=True)
    proprietario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='contatos_proprietario')
    descricao = models.TextField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.nome

class Ocorrencia(models.Model):

    class Grau(models.TextChoices):
        BAIXO = 'BAIXO', 'Baixo'
        MEDIO = 'MEDIO', 'Médio'
        ALTO = 'ALTO', 'Alto'

    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cpf_cnpj_relacionado = models.CharField(max_length=14, help_text="CPF ou CNPJ relacionado à ocorrência")
    unidade_de_negocio = models.ForeignKey(UnidadedeNegocio, on_delete=models.PROTECT, related_name='ocorrencias')
    numero_ocorrencia = models.PositiveIntegerField(editable=False)
    assunto = models.CharField(max_length=100)
    resposta_da_area = models.TextField(max_length=400, blank=True, null=True)
    grau_da_ocorrencia = models.CharField(max_length=5, choices=Grau.choices)
    fraudante_utilizou_ia = models.BooleanField(default=False)
    descricao = models.TextField(max_length=500)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.UUIDField(null=True, blank=True)
    proprietario = GenericForeignKey('content_type', 'object_id')

    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('unidade_de_negocio', 'numero_ocorrencia')
        ordering = ['-data_criacao']

    def __str__(self):
        return f"{self.unidade_de_negocio} - Nro{self.numero_ocorrencia}: {self.assunto}"
    
    def save(self, *args, **kwargs):
        if not self.numero_ocorrencia:
            ultima_ocorrencia = Ocorrencia.objects.filter(
                unidade_de_negocio=self.unidade_de_negocio
            ).order_by('-numero_ocorrencia').first()

            if ultima_ocorrencia:
                self.numero_ocorrencia = ultima_ocorrencia.numero_ocorrencia + 1
            else:
                self.numero_ocorrencia = 1
        
        super().save(*args, **kwargs)







