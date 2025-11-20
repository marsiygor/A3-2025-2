# Sistema Sentinela

O **Sistema Sentinela** é uma aplicação web desenvolvida para o registro e monitoramento de ocorrências de fraudes e golpes. O sistema permite que usuários registrem novas ocorrências e visualizem um dashboard com estatísticas e gráficos sobre os tipos de fraudes, gravidade e evolução temporal.

## 🚀 Quick Start (Como Rodar)

Siga os passos abaixo para executar o projeto localmente. Você precisará de dois terminais abertos.

### Pré-requisitos
-   Node.js e npm instalados.
-   Python instalado.

### Passo 1: Backend (Django)

1.  Abra um terminal e navegue até a pasta do backend:
    ```bash
    cd back-end/sistema-sentinela
    ```
2.  (Opcional mas recomendado) Crie e ative um ambiente virtual:
    ```bash
    python -m venv .venv
    # Windows:
    .venv\Scripts\activate
    # Linux/Mac:
    source .venv/bin/activate
    ```
3.  Instale as dependências:
    ```bash
    pip install django djangorestframework django-cors-headers asgiref
    ```
4.  Execute as migrações do banco de dados:
    ```bash
    python manage.py migrate
    ```
5.  Inicie o servidor:
    ```bash
    python manage.py runserver
    ```
    O backend estará rodando em `http://127.0.0.1:8000/`.

### Passo 2: Frontend (React + Vite)

1.  Abra um **novo terminal** e navegue até a pasta do frontend:
    ```bash
    cd front-end/sistema-sentinela
    ```
2.  Instale as dependências do Node:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse a aplicação no navegador através do link exibido (geralmente `http://localhost:5173/`).

---

## 🛠️ Tecnologias Utilizadas

### Frontend
-   **React** (v19): Biblioteca JavaScript para construção da interface.
-   **Vite**: Ferramenta de build e servidor de desenvolvimento rápido.
-   **Bootstrap 5 & React-Bootstrap**: Framework CSS e componentes para estilização responsiva.
-   **React Router DOM**: Gerenciamento de rotas e navegação.
-   **Recharts**: Biblioteca para criação de gráficos (Dashboard).
-   **React Input Mask**: Máscaras para campos de formulário (CPF, Telefone).

### Backend
-   **Django** (v5): Framework web Python de alto nível.
-   **Django REST Framework (DRF)**: Toolkit para construção de Web APIs.
-   **SQLite**: Banco de dados relacional (padrão do Django para desenvolvimento).
-   **Django CORS Headers**: Gerenciamento de Cross-Origin Resource Sharing.

---

## 🔗 Integrações e Arquitetura

O projeto segue uma arquitetura **Client-Server** desacoplada:

1.  **API RESTful**: O backend Django expõe endpoints JSON através do Django REST Framework.
    -   `/api/ocorrencias/`: Listagem e criação de ocorrências.
    -   `/api/unidadedenegocio/`: Consulta de unidades de negócio.
    -   `/api/usuarios/`: Gestão de usuários.

2.  **Proxy Reverso (Vite)**:
    -   O frontend utiliza um proxy configurado no `vite.config.js` para redirecionar chamadas iniciadas em `/api` para `http://localhost:8000`. Isso evita problemas de CORS durante o desenvolvimento e simplifica as chamadas no código React.

3.  **Fluxo de Dados**:
    -   O **Dashboard** consome dados da API para calcular métricas em tempo real.
    -   O formulário de **Nova Ocorrência** envia dados (POST) para o backend, que valida e salva no banco de dados SQLite. Campos de contato (Nome, Email, etc.) são armazenados de forma estruturada na descrição da ocorrência.

---

## 👥 Feito por

-   **Ygor Fernandes Marsi** - 822156379
-   **Maria Eduarda Pereira** - 822145642
-   **Lucas Santos Carvalho** - 82211118
-   **Joao Vitor Nonato** - 822163044
-   **Ana Carolina Amaral Silva** - 822138023
-   **Stephany Silva Dantas** - 822223694
-   **Maria Victoria Bezerra da Silva** - 8222242697
