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

- [Instalação](#instalação)
- [Utilização](#utilização)
- Tour pelos arquivos
- Uso de cada biblioteca
- Um pouco sobre mim
- Próximas features

---

## **Instalação**

##### Para começar a utilizar esse projeto é bem simples, basta instalar as dependências do projeto digitando o seguinte comando em seu terminal:

##### `npm install`

##### Pra uma melhor experiencia recomendo a utilização do **[Insomnia](https://insomnia.rest/)**, ou Postman onde será possível ver e fazer as requisições de forma muito mais didática.

Após instalar as dependências, é só colocar na barra de URL a url para requisição + port em que está o servidor, como no exemplo abaixo:

![image-20211006182256405](https://i.imgur.com/GK3sUrE.png)

Essa é a url base. Todas as rotas devem ser colocadas imediatamente após.

##### Obs.: No navegador também é possível fazer as requisições de post/put, porém é necessário alguns plugins/extensões de terceiros para efetuar tais ações.

---

## **Utilização**

### A utilização se dá de forma simples, através de 4 principais rotas que representam as operações básicas de um banco de dados (C.R.U.D - Create Read Update Delete) e mais algumas rotas auxiliares.

### Vale destacar: 

- No arquivo **src/database/index.js** você encontrará variáveis moduladas para que você coloque o banco de dados que estiver utilizando. **https://i.imgur.com/f9sLs0q.png**, se este é o seu caso, não precisa fazer alterações :)
- Pela segurança do usuário, a senha não aparece nenhum momento nas requisições, e no banco de dados ela é salva com encriptação md5. Caso deseje visualizar as senhas nas requisições, basta comentar/deletar as linhas 107 e 16 do arquivo src/controllers/userControllers.js. E para retirar a encriptação basta comentar/deletar da linha 34 à linha 39. No capítulo Uso de cada biblioteca será explicado melhor sobre cada biblioteca utilizada.
- O identificador do usuário se dá tanto pelo _id gerado automaticamente, como também pelo **https://i.imgur.com/f9sLs0q.png**, que deverão ser únicos.

## Neste projeto temos os seguintes métodos e suas rotas:

### MÉTODO POST:

- #### `Rota /create:`

  Através dessa rota é possível inserir documentos no banco de dados. 

  É necessário enviar uma requisição com o formato .json no corpo com o seguinte formato:

  ![image-20211006174621316](https://i.imgur.com/xKhdBkE.png)

  A resposta se dará mostrando uma chave com o objeto dos dados inseridos e uma chave onde será mostrado o status da requisição.

  Exemplo:

  ![image-20211006174737218](https://i.imgur.com/46KiGmY.png)

  

  #### Algumas observações:

  - Para a criação da senha não há nenhum critério de validação quanto a tamanho ou força.

  - Todos estes campos devem estar preenchidos, e o username deverá ser único. Não seguir esses 2 critérios retornará uma resposta 400 - Bad Request
  
    

### MÉTODO GET:

- #### `Rota /users:`

  Através dessa rota é possível obter as informações de todos os usuários cadastrados.

  A resposta se dará com o seguinte formato:

  ![image-20211006174959875](/home/morato_dev/.var/app/io.typora.Typora/config/Typora/typora-user-images/image-20211006175016220.png)

  

- #### `Rota /read/<idUsuario>`

  Através dessa rota é possível obter o documento, ou seja, todas as informações de um usuário cadastrado passando apenas o ID deste usuário.

  Exemplo:

  `http://localhost:3000/read/615d0da71b8d7f686d380571`

  A resposta se dará com o seguinte formato:

  ![image-20211006174920810](https://i.imgur.com/f9sLs0q.png)

  

  

### MÉTODO PUT:

- #### `Rota /update/<idUsuario>`

  Através dessa rota é possível atualizar os dados de um usuário, passando na rota o _id desse usuário. É necessário enviar uma requisição com o formato .json no corpo com o seguinte formato:

  ![image-20211006181410700](https://i.imgur.com/ru3apRe.png)

  A resposta se dará mostrando os dados atualizados do usuário e o status da requisição, com o seguinte formato:

  ![image-20211006181643218](https://i.imgur.com/k4b7B1w.png)

- #### `Rota /login`

  Através dessa rota é possível simular o login de um usuário. É necessário enviar uma requisição com o formato .json no corpo com o seguinte formato: 

  ​													![image-20211006184318692](https://i.imgur.com/4gwJCnM.png)	

  A resposta se dará mostrando uma mensagem de sucesso ou de erro, e o status da requisição, com o seguinte formato:

  ![image-20211006185119206](https://i.imgur.com/HGiOudZ.png)

  

### MÉTODO DELETE:

- #### `Rota /delete/<idUsuario>`

  Através dessa rota é possível deletar cadastro de um usuário, do banco de dados, passando apenas o ID deste usuário.

  Exemplo:

  `http://localhost:3000/read/615d0da71b8d7f686d380571`

  

  A resposta se dará mostrando uma mensagem de sucesso ou de erro, e o status da requisição, com o seguinte formato:

  ![image-20211006185328829](https://i.imgur.com/4WWIIOF.png)

  