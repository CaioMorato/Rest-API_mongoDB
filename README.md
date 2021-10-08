# CRUD - MongoDB

### Projeto de uma API em Node.js integrado ao MongoDB

---

## Visão Geral

##### Este projeto foi realizado utilizando 4 bibliotecas listadas abaixo, e aceita requisições  **GET**, **POST**, **PUT**, e **DELETE**

##### Bibliotecas:

* [Express](https://expressjs.com/) - Framework Node
* [Mongoose](https://mongoosejs.com/) - Integração com MongoDB
* [Nodemon](https://www.npmjs.com/package/nodemon) - Reinicia automaticamente o servidor quando detecta alterações
* [CryptoJS](https://cryptojs.gitbook.io/docs/) - Criptografia das senhas salvas

---

## **Sumário**

- [Pré Requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Rotas | Endpoints](#rotas)
  - [POST](#método post)
  - [GET](#método get)
  - [PUT](#método-put)
  - [DELETE](#método delete)
  - [Possíveis respostas/status](#possíveis respostas e status)
- Tour pelos arquivos
- Uso de cada biblioteca
- Um pouco sobre mim
- Próximas features

---

## **Pré requisitos**

##### Este projeto foi feito em um ambiente linux. Recomendo o uso do mesmo para utilização do projeto e o guia apresentado abaixo se dará para esse sistema.

Também é necessário que o usuário tenha o banco de dados mongodb já instalado e ativo em seu computador.

Para ativar o servidor basta digitar em seu terminal: 

`sudo service mongod start`

Para verificar se o sistema está ativo digite: 

`service mongod status`

A resposta deverá ser algo desse tipo:

< < ( ( Imagem do status do servidor aqui )) > >

## **Instalação**

Para começar a utilizar esse projeto é bem simples, basta instalar as dependências do projeto digitando o seguinte comando em seu terminal:

##### `npm install`

Após instalar as dependências, também é necessário ligar o servidor. Para ativar o servidor digite em seu terminal:

`npm start`

Com isso ele mostrará que o servidor está iniciado e em qual porta.



Pra uma melhor experiencia recomendo a utilização do **[Insomnia](https://insomnia.rest/)**, ou Postman onde será possível ver e fazer as requisições de forma muito mais didática.

Após instalar as dependências, é só colocar na barra de URL a url para requisição + port em que está o servidor, como no exemplo abaixo:

![image-20211006182256405](https://i.imgur.com/GK3sUrE.png)

Essa é a url base. Todas as rotas devem ser colocadas imediatamente após.

##### Obs.: No navegador também é possível fazer as requisições de post/put, porém é necessário alguns plugins/extensões de terceiros para efetuar tais ações.

---

## **Utilização**

### A utilização se dá de forma simples, através de 4 principais rotas que representam as operações básicas de um banco de dados (C.R.U.D - Create Read Update Delete) e mais algumas rotas auxiliares.

### Vale destacar: 

- No arquivo **src/database/index.js** você encontrará variáveis moduladas para que você coloque o banco de dados que estiver utilizando. Por padrão, está configurado para um banco de dados local, se este é o seu caso, não precisa fazer alterações :)
- Pela segurança do usuário, a senha não aparece nenhum momento nas requisições, e no banco de dados ela é salva com encriptação md5. Caso deseje visualizar as senhas nas requisições, basta comentar/deletar as linhas 107 e 16 do arquivo src/controllers/userControllers.js. E para retirar a encriptação basta comentar/deletar da linha 34 à linha 39. No capítulo Uso de cada biblioteca será explicado melhor sobre cada biblioteca utilizada.
- O identificador do usuário se dá tanto pelo _id gerado automaticamente, como também pelo nome de usuário, que deverão ser únicos.

## **Rotas** | Endpoints

### MÉTODO POST:

- #### `Rota /create:`

  Através desse endpoint é possível inserir/cadastrar usuários no banco de dados. 

  É necessário enviar uma requisição com o formato JSON no corpo, com o seguinte formato:

  ```json
  {
  	"name": "Nome do Usuário",
  	"username": "Nome único DE usuário",
  	"password": "Senha para login"
  }
  ```

  A resposta se dará em formato de objeto com 2 chaves. A primeira mostrando um checkout com os dados que foram inseridos, e a segunda informando o status da operação.

  

  Exemplo:

  ```json
  {
    "newUser": {
      "name": "Elizabeth Queen",
      "username": "queen-lizzy",
      "_id": "6160754fb73a585a359710ff",
      "last_update": "2021-10-08T16:43:59.168Z"
    },
    "status": 201
  }
  ```
  
  
  
  Algumas observações:
  
  - Para a criação da senha não há nenhum critério de validação quanto a tamanho ou força.
  
  - Todos estes campos devem estar preenchidos, e o username deverá ser único. Não seguir esses 2 critérios retornará uma resposta 400 - Bad Request
  
    

### MÉTODO GET:

- #### `Rota /users:`

  Através desse endpoint é possível obter o cadastro de todos os usuários.

  A resposta se dará com o seguinte formato:

  ```json
  {
    "allUsers": [
      {
        "_id": "6160754fb73a585a359710ff",
        "name": "Elizabeth Queen",
        "username": "queen-lizzy",
        "last_update": "2021-10-08T16:43:59.168Z"
      },
      {
        "_id": "616075edb73a585a35971106",
        "name": "John Doe",
        "username": "john",
        "last_update": "2021-10-08T16:46:37.783Z"
      }
        ...
    ],
    "status": 200
  }
  ```

  

- #### `Rota /read/<idUsuario>`

  Através desse endpoint é possível obter o cadastro, de um usuário específico passando o _id do usuário na rota.

  Exemplo de rota:

  `http://localhost:3000/read/616075edb73a585a35971106`

  A resposta se dará com o seguinte formato:

  ```json
  {
    "findUser": {
      "_id": "616075edb73a585a35971106",
      "name": "John Doe",
      "username": "john",
      "last_update": "2021-10-08T16:46:37.783Z"
    },
    "status": 200
  }
  ```
  
  

### MÉTODO PUT:

- #### `Rota /update/<idUsuario>`

  Através desse endpoint é possível atualizar o cadastro de um usuário específico, passando o _id do usuário na rota. 

  É necessário enviar uma requisição com o formato JSON no corpo, com o seguinte formato:

  ```json
  {
  	"name": "Marcelo D2",
  	"username": "marcelod2"
  }
  ```

  A resposta se dará mostrando os dados atualizados do usuário e o status da requisição, com o seguinte formato:

  ```json
  {
    "findUser": {
      "_id": "616075edb73a585a35971106",
      "name": "Marcelo D2",
      "username": "marcelod2",
      "last_update": "2021-10-08T17:36:44.640Z"
    },
    "status": 200
  }
  ```

  

- #### `Rota /login`

  Através desse endpoint é possível simular o login de um usuário. 

  É necessário enviar uma requisição com o formato .json no corpo com o seguinte formato: 

  ```json
  {
  	"username": "queen-lizzy",
  	"password": "1234"
  }
  ```
  
  
  
  A resposta se dará mostrando uma mensagem de sucesso ou de erro, e o status da requisição, com o seguinte formato:
  
  ```json
  {
    "message": "You successfully logged in!",
    "status": 200
  }
  ```
  
  
  
  Algumas observações:
  
  - Quando o usuário é criado, não existe o campo last_login, mas ao utilizar esse endpoint, o campo aparece e o valor dele é o horário em que a rota foi acessada.
  

### MÉTODO DELETE:

- #### `Rota /delete/<idUsuario>`

  Através desse endpoint é possível deletar cadastro de um um usuário, passando o _id do usuário na rota. 

  Exemplo de rota:

  `http://localhost:3000/read/616075edb73a585a35971106`

  

  A resposta se dará mostrando uma mensagem de sucesso ou de erro, e o status da requisição, com o seguinte formato:

  ```json
  {
    "message": "User successfully deleted!",
    "status": 200
  }
  ```

## **Possíveis respostas e status**

### Sucesso:

**200 (OK) -** Significa que está tudo OK e a requisição foi bem sucedida.

**204 (No Content) -** Normalmente esse é o status utilizado para métodos PUT e DELETE. Nesse status não é mostrado nenhum retorno, mesmo sendo uma requisição bem sucedida. Nesse projeto estamos usando o 200 para poder passar informação no retorno.

### Erros:

**400 (Bad Request) -** Significa que algo na solicitação está errado. Pode ser a extensão do envio da requisição, algum erro na rota ou algum dado errado ao enviar requisições.