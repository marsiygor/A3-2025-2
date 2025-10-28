from django.contrib import admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from app.models import ( 
    Usuario, AreaNegocio, EquipeAtendimento, 
    UnidadeNegocio, Contatos, Ocorrencias
)

class CustomUserAdmin(UserAdmin):
    model = Usuario
    fieldsets = UserAdmin.fieldsets + (
        ('Campos Customizados', {'fields': ('area_de_negocio', 'cargo', 'gerente', 'equipe_de_atendimento')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Campos Customizados', {'fields': ('area_de_negocio', 'cargo', 'gerente', 'equipe_de_atendimento')}),
    )

# Registre seus modelos
admin.site.register(Usuario, CustomUserAdmin)
admin.site.register(AreaNegocio)
admin.site.register(EquipeAtendimento)
admin.site.register(UnidadeNegocio)
admin.site.register(Contatos)
admin.site.register(Ocorrencias)
