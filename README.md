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
  - [POST](#método-post)
  - [GET](#método-get)
  - [PUT](#método-put)
  - [DELETE](#método-delete)
  - [Possíveis respostas/status](#possíveis-respostas-e-status)
- [Tour pelos arquivos](#tour-pelos-arquivos)
- [Uso de cada biblioteca](#uso-de-cada-biblioteca)
- [Sobre o autor](#sobre-o-autor)

---

## **Pré requisitos**

##### Este projeto foi feito em um ambiente linux. Recomendo o uso do mesmo para utilização do projeto e o guia apresentado abaixo se dará para esse sistema.

Também é necessário que o usuário tenha o banco de dados mongodb já instalado e ativo em seu computador.

Para ativar o servidor basta digitar em seu terminal: 

`sudo service mongod start`

Para verificar se o sistema está ativo digite: 

`service mongod status`

A resposta deverá ser algo desse tipo:

![image-20211008172353306](https://i.imgur.com/oJM8qaO.png)

---

## **Instalação**

Para começar a utilizar esse projeto é bem simples, basta instalar as dependências do projeto digitando o seguinte comando em seu terminal:

##### `npm install`

Após instalar as dependências, também é necessário ligar o servidor. Para ativar o servidor digite em seu terminal:

##### `npm start`

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
- O identificador do usuário se dá tanto pelo **_id** gerado automaticamente, como também pelo nome de usuário, que deverão ser únicos.

---

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

---

## **Possíveis respostas e status**

### Sucesso:

​	**200 (OK) -** Significa que está tudo OK e a requisição foi bem sucedida.

​	**204 (No Content) -** Normalmente esse é o status utilizado para métodos PUT e DELETE. Nesse status não é mostrado nenhum retorno, mesmo sendo uma requisição bem sucedida. Nesse projeto estamos usando o 200 para poder passar informação no retorno.

### Erros:

​	**400 (Bad Request) -** Significa que algo na solicitação está errado. Pode ser a extensão do envio da requisição, algum erro na rota ou algum dado errado ao enviar requisições.

---

## **Tour pelos arquivos**

Todos os arquivos utilizados ficam dentro de uma pasta `src/`. Dentro dela existem 5 arquivos/diretórios e suas subpastas. Vamos dar uma passada por cada um para ver como modular a aplicação de acordo com seu gosto.

- **src/routes.js**

  Nesse arquivo está localizado todas as possíveis rotas da aplicação, dividido em 2 partes. A primeira são as rotas basicas de um CRUD, e a segunda parte são as rotas de login e pra listagem de todos os usuários.

- **src/index.js**

  Esse é o arquivo principal da aplicação. Aqui é onde ficam os middlewares do express e onde está sendo chamado o uso das rotas. Há um middleware que, a cada vez que é disparado alguma requisição, ele imprime algumas informações no console. Também é impresso no console um aviso dizendo que o servidor está aberto e qual porta está sendo utilizada, o padrão é a porta 3000.

- **src/controllers/userController.js**

  É aqui onde fica o controles de como são lidas e o que são feitas com as informações das requisições, é o cérebro da operação.

  A função **createUser** é responsável por criar novos usuários. Há primeiro uma verificação pra ver se o usuário já está cadastrado no banco de dados, através de um username único. Se já tiver um username igual, retornará um erro.

  A função **readUser** é responsável por procurar um usuário pelo _id.

  A função **updateUser** é responsável por atualizar o cadastro de um usuário. Essa função fará uma busca pelo _id do usuário passado no endpoint e atualizará o username e/ou nome.

  A função **deleteUser** é responsável por deletar o cadastro de um usuário. Será feito uma busca pelo _id passado no endpoint e verificará se o usuário realmente está no banco de dados ou não. Se estiver, será deletado.

  A função **showUsers** monstrará todos os usuários cadadstrados.

  A função **loginUser** é responsável por simular um login de usuário. Ela fará uma busca pelo username no banco de dados e fará uma comparação entre a criptografia da senha requisitada pela senha salva. Se for igual, ela retornará que o usuário está logado e irá atualizar o cadastro do usuário com um campo last_login com a data em que foi feita a requisição.

  Nesse arquivo, por ser responsável pelo controle entre as informações do banco de dados com as requisições, é nele que você pode alterar se a senha será mostrada ou não em todas as requisições e também as informações que serão mostradas e como elas se interligarão umas com as outras.

- **src/database/index.js**

  Esse é o arquivo onde está configurado o acesso ao banco de dados. 

  Na constante **databasePrefix** ficará a informação de prefixo do banco de dados. Por padrão todas as informações desse arquivo estão configuradas para servir um banco de dados local. Caso seja um banco de dados externo, normalmente a 'string' de acesso começa com +srv:// então é só trocar nessa constante.

  A constante **databaseString** armazena justamente a 'string' de acesso do banco de dados.

  A constante **databaseName** armazenará o nome do banco de dados, e caso não exista nenhum banco de dados com esse nome, será criado. Por padrão o nome é users.

  A **função connect** do mongoose juntará todas essas informações e dará o acesso ao banco de dados.

- **src/models/user.js**

  É aqui que fica o modelo do banco de dados, onde ficará a informação de como serão as informações enviadas para virar um documento no mongoDB.

  No UserSchema estão declaradas todas as informações que serão armazenadas. No segundo parâmetro dessa função estão algumas informações gerais como por exemplo **versionKey: false**. Essa chave declarada como false, retira um campo que é colocado por padrão chamado "__v".

  Logo abaixo, há uma função que faz com que, ao fazer uma requisição com o campo "password", o valor dessa chave de senha será criptografado com uma criptografia MD5. Essa biblioteca utilizada permite diferentes tipos de criptografia que podem ser utilizadas, caso não deseje criptografar uma senha a ser salva no banco de dados basta deletar essa função.

---

## **Uso de cada biblioteca**

Aqui vou falar um pouco sobre o uso de cada biblioteca utilizada. Mesmo sendo poucas bibliotecas acho interessante explicar o propósito específico de cada uma, principalmente as menos famosas que as outras.

- **Express**

  O express é basicamente uma das principais ferramentas para se lidar com aplicações web Node.js. Um dos grandes benefícios do express são os middlewares, que interceptam requisições e podem lidar com dados.

- **Mongoose**

  É o mongoose que faz a 'integração' entre o banco de dados mongo com o código em javascript. Com seus métodos e funções próprias, além de aumentarem a produtividade também permitem uma grande manipulação e manutenção dos dados.

- **Nodemon**

  O nodemon é uma ferramenta para desenvolvimento de projetos como esse. Ele é responsável por deixar o servidor aberto e caso tenha alguma alteração nos arquivos, ele irá atualizar e reiniciar o servidor automaticamente, aumentando muito a produtividade.

- **CryptoJS**

  É uma biblioteca com padrões de criptografia diferentes. É muito bacana trabalhar com ela e nesse projeto ela serviu pra criptografar a senha do usuário pra salvar no banco de dados.

---

## **Sobre o autor**

Olá! Que bom que chegou até aqui!

Eu me chamo Caio e sou estudante de desenvolvimento Web, comecei meus estudos no ano de 2021 e estou me apaixonando cada dia que passa, através dos estudos, por educação e tecnologia. Esse projeto e esse README foram desenvolvidos como um desafio técnico e empenhei muito carinho na construção de cada linha.

[Você pode olhar mais dos meus repositórios aqui](https://github.com/CaioMorato)

[Ou se conectar comigo no linkedin!](https://www.linkedin.com/in/morato-dev/)

