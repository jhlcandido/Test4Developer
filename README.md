# Test4Developer

Olá, siga as instruções abaixo para executar o projeto

# Instruções

para executar o projeto precisaremos de.

- uma conta no firebase.
- um projeto no console do firebase.
- uma aplicação web vinculada ao projeto do firebase.
- versão LTS do [NodeJS](https://nodejs.org/en/) instalada na maquina.

## Configurando Projeto do [Firebase](https://console.firebase.google.com)

    - acesse o console do firebase crie uma caso não possua
    - acesse seu projeto no console / crie um caso não possua
    - nas configurações do projeto crie uma aplicação do tipo WEB
    - na tela de configuraçoes acesse a aba Contas de Serviço
    - no final da tela clique no botão "Gerar nova chave privada"
    - copie o conteudo do arquivo gerado no arquivo firebase_config.json encontrado no caminho "/server/firebase_config.json"

## Ambiente de Testes

#### Definindo variaveis de ambiente

    - abra o arquivo .dev.env na pasta /diretorio_do_projeto/api
    - preencha os dados do ambiente
        - APP_SECRET= este campo é obrigatorio crie uma chave e inclua aqui
        - MONGO_DB_HOST= endereço do mongodb
        - MONGO_DB_PORT= informe apenas se o mongo db estiver rodando fora da porta default
        - MONGO_DB_USER= informe o usuario caso o banco possua autenticacao
        - MONGO_DB_PASS= informe a senha caso possua autenticacao
        - MONGO_DB_NAME= informe o nome do banco
        - PORT= informe a porta onde a api sera acessada

### Executando a API

    - após configurar o projeto do firebase e definir as variaveis de ambiente
    - execute o comando

    $ npm run dev

### Executando o projeto WEB

    - abra o arquivo /diretorio_do_projeto/web/src/services/index.ts
        - substitua a url da linha 4 pelo endereço da api de desenvolvimento
    - abra o terminal na pasta /diretorio_do_projeto/web
    - execute o comando

    $ npm start
