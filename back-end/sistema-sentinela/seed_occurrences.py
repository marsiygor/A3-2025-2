import os
import django
import random
from datetime import date, timedelta
from faker import Faker

# Configurar ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from app.models import Ocorrencia, UnidadedeNegocio

fake = Faker('pt_BR')

def seed_occurrences(n=20):
    print(f"Gerando {n} ocorrências de teste...")
    
    # Garantir que existe pelo menos uma unidade de negócio
    unidade = UnidadedeNegocio.objects.first()
    if not unidade:
        print("Criando Unidade de Negócio padrão...")
        unidade = UnidadedeNegocio.objects.create(
            nome="Matriz",
            cnpj="00.000.000/0001-91",
            endereco="Rua Teste, 123"
        )

    tipos_fraude = [
        "Phishing", "Roubo de Identidade", "Cartão Clonado", 
        "Boleto Falso", "Engenharia Social", "Invasão de Conta",
        "Fraude no Pix", "Documento Falso"
    ]
    
    graus = ["BAIXO", "MEDIO", "ALTO"]

    for _ in range(n):
        # Gerar data de nascimento para simular idades variadas (18 a 80 anos)
        idade = random.randint(18, 80)
        data_nascimento = date.today() - timedelta(days=idade*365)
        
        Ocorrencia.objects.create(
            unidade_de_negocio=unidade,
            cpf_cnpj_relacionado=fake.cpf().replace('.', '').replace('-', ''),
            assunto=random.choice(tipos_fraude), # Usando o tipo como assunto também para facilitar
            tipo_fraude=random.choice(tipos_fraude),
            data_nascimento=data_nascimento,
            descricao=fake.text(),
            grau_da_ocorrencia=random.choice(graus),
            fraudante_utilizou_ia=random.choice([True, False])
        )
    
    print("Concluído! Ocorrências geradas com sucesso.")

if __name__ == "__main__":
    seed_occurrences()
