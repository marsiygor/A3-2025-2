from django.db import models

import uuid
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class Usuario(AbstractUser):
    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
class UnidadedeNegocio(models.Model): 
    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cnpj = models.CharField(max_length=14, unique=True)

    def __str__(self):
        return self.cnpj


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
    grau_da_ocorrencia = models.CharField(max_length=5, choices=Grau.choices)
    descricao = models.TextField(max_length=500)

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







