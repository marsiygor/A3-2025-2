import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from app.models import UnidadedeNegocio

def seed():
    if UnidadedeNegocio.objects.exists():
        print("Business Unit already exists.")
        return

    # Create a default Business Unit
    # Using a valid format CNPJ for testing: 00.000.000/0001-91
    bu = UnidadedeNegocio.objects.create(cnpj="00.000.000/0001-91")
    print(f"Created Business Unit: {bu.cnpj} ({bu.guid})")

if __name__ == '__main__':
    seed()
