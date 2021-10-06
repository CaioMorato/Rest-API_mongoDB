# CRUD - MongoDB

### Projeto de uma API em Node.js integrado ao MongoDB

---

## Visão Geral

##### Este projeto foi realizado utilizando 4 bibliotecas listadas abaixo, e aceita requisições em **GET**, **POST**, **PUT**, e **DELETE**

##### Bibliotecas:

* [Express](https://expressjs.com/) - Framework Node
* [Mongoose](https://mongoosejs.com/) - Integração com MongoDB
* [Nodemon](https://www.npmjs.com/package/nodemon) - Reinicia automaticamente o servidor quando detecta alterações
* [CryptoJS](https://cryptojs.gitbook.io/docs/) - Criptografia das senhas salvas

---

## **Sumário**

- [Instalação](#instalação)
- [Utilização](#utilização)
- Uso de cada biblioteca
- Um pouco sobre mim
- Próximas features

---

## **Instalação**

##### Para começar a utilizar esse projeto é bem simples. 

##### Basta instalar as dependências digitando o seguinte comando em seu terminal:

`npm install`

##### Após isso já está pronto para começar a utilizar. Pra uma melhor experiencia recomendo a utilização do **[Insomnia](https://insomnia.rest/)**, ou Postman onde será possível ver e fazer as requisições de forma muito mais didática.

---

## **Utilização**

### A utilização se dá de forma simples, através de 4 principais rotas que representam as operações básicas de um banco de dados e mais algumas rotas auxiliares.

### Vale destacar: 

- No arquivo **src/database/index.js** você encontrará variáveis moduladas para que você coloque o banco de dados que estiver utilizando. **A configuração padrão está definida para um banco de dados local**, se este é o seu caso, não precisa fazer alterações :)
- Pela **segurança do usuário**, a senha **não aparece em** nenhum momento nas requisições, e no banco de dados ela é salva com **encriptação md5**. Caso deseje visualizar as senhas nas requisições, basta comentar/deletar as linhas 107 e 16 do arquivo **src/controllers/userControllers.js**. E para retirar a encriptação basta comentar/deletar da linha 34 à linha 39. Mais à frente deste guia explicarei melhor como funciona a encriptação.

## Neste projeto temos os seguintes métodos e suas rotas:

### MÉTODO POST:

- ### `Rota /create:`

  Através dessa rota é possível **inserir documentos** no banco de dados. É necessário enviar uma requisição com um arquivo .json no corpo com o seguinte formato:

  ```json
  {
      "name": "Nome do usuário",
      "username": "Nome único DE usuário",
      "password": "senha para login"
  }
  ```

  #### Algumas observações:

  ##### Para a criação da senha não há nenhum critério de validação quanto a tamanho ou força.

  ##### Todos estes campos devem estar preenchidos, e o **username** deverá ser único. Não seguir esses 2 critérios retornará uma resposta **400 - Bad Request**

### MÉTODO GET:

- ### `Rota /read/<idUsuario>`:

  Através dessa rota é possível **obter** o documento, ou seja, todas **as informações de um usuário cadastrado** **passando apenas o ID** deste usuário.

  A resposta se dará com o seguinte formato:

  ```json
  {
    "newUser": {
      "name": "John Doe",
      "username": "johnDoe_123",
      "_id": "615d0da71b8d7f686d380571",
      "last_update": "2021-10-06T02:44:55.980Z"
    },
    "status": 201
  }
  ```

