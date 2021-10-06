# CRUD - MongoDB

#### Projeto de uma API em Node.js integrado ao MongoDB

---

## **Visão Geral**

##### Este projeto foi realizado utilizando 4 bibliotecas listadas abaixo, e aceita requisições em **GET**, **POST**, **PUT**, e **DELETE**

##### Bibliotecas:

* [Express](https://expressjs.com/) - Framework Node
* [Mongoose](https://mongoosejs.com/) - Integração com MongoDB
* [Nodemon](https://www.npmjs.com/package/nodemon) - Reinicia automaticamente o servidor quando detecta alterações
* [CryptoJS](https://cryptojs.gitbook.io/docs/) - Criptografia das senhas salvas

---

# **Sumário**

- [Instalação](#instalação)
- [Utilização](#utilização)
- Uso de cada biblioteca
- Um pouco sobre mim
- Próximas features

---

# **Instalação**

##### Para começar a utilizar esse projeto é bem simples. 

##### Basta instalar as dependências digitando o seguinte comando em seu terminal:

`npm install`

##### Após isso já está pronto para começar a utilizar. Pra uma melhor experiencia recomendo a utilização do **[Insomnia](https://insomnia.rest/)**, ou Postman onde será possível ver e fazer as requisições de forma muito mais didática.

---

# **Utilização**

#### A utilização se dá de forma simples, através de 4 principais rotas que representam as operações básicas de um banco de dados e mais algumas auxiliares.

No arquivo src/database/index.js você encontrará variáveis moduladas para que você coloque o banco de dados que estiver utilizando. A configuração padrão está definida para um banco de dados local, se este é o seu caso, não precisa fazer alterações :)

## Neste projeto temos os seguintes métodos e suas rotas:

### MÉTODO POST:

- ### Rota '/create':

  Através dessa rota é possível inserir documentos no banco de dados. É necessário enviar uma requisição com um arquivo json no corpo com o seguinte formato:

  ```json
  {
      "name": "Nome do usuário",
      "username": "Nome único DE usuário",
      "password": "senha para login"
  }
  ```

  

