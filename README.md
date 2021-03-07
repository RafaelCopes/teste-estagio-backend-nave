## Link para o CodeSandbox com os exercícios de lógica:

https://codesandbox.io/s/teste-estagio-rafael-copes-vkj9m?file=/index.html

## Como rodar

Primeiro, você precisa ter o <kbd>[NodeJS](https://nodejs.org/en/download/)</kbd> instalado na sua máquina.

Você pode optar por utilizar o **yarn** ou **npm**. Meus exemplos utilizarão o **yarn**.

Instale as dependências contidas nos arquivos `package.json` que se encontram na raíz do repositório. Para instalar as dependências, basta abrir o terminal no diretório e digitar o comando:

Exemplo:
```sh
# Clonando o repositório:
$ git clone https://github.com/RafaelCopes/teste-estagio-backend-nave

# Instalando as dependências:
$ cd ./teste-estagio-backend-nave

# Renomeie o arquivo .env-example para .env e insira as informações que condizem com o seu host:
$ mv .env.example .env

# Atualizar as dependèncias
$ yarn
```

## Rodando o server

Crie um banco de dados PostgreSQL localmente.
No arquivo .env, adicione nas variáveis as informações de seu banco de dados.

Agora rode:
```sh
# Rodando migrations:
$ yarn knex migrate:latest

# Executando o servidor:
$ yarn start
```
## Utilizando o insomnia

Para testar a API, baixe e instale o Insomnia e em seguida clique na Workspace → Import/Export → Import Data → From File → e selecione o arquivo insomnia-structure.json deste repositório.

## Observações

Crie o primeiro usuário ou projeto com o array de identificadores vazio, pois se colocar um id ainda não existente ocorrerá um erro de chave estrangeira.

Depois disso, pode criar novos usuários e projetos relacionados com os já criados e etc...
