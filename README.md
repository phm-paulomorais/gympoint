<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Desafio 2: Gympoint, o início
</h3>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-02?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafio-02?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-entrega">Entrega</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o desafio

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app gerenciador de academia, o **Gympoint**.

Nesse primeiro desafio vamos criar algumas funcionalidades básicas que aprendemos ao longo das aulas até aqui. Esse projeto será desenvolvido aos poucos até o fim da sua jornada onde você terá uma aplicação completa envolvendo back-end, front-end e mobile, que será utilizada para a **certificação do bootcamp**, então, bora pro código!

### Um pouco sobre as ferramentas

Você deverá criar a aplicação do zero utilizando o [Express](https://expressjs.com/), além de precisar configurar as seguintes ferramentas:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL ou MySQL);

### Funcionalidades

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação.

#### 1. Autenticação

Permita que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.

Crie um usuário administrador utilizando a funcionalidade de [seeds do sequelize](https://sequelize.org/master/manual/migrations.html#creating-first-seed), essa funcionalidade serve para criarmos registros na base de dados de forma automatizada.

Para criar um seed utilize o comando:

```js
yarn sequelize seed:generate --name admin-user
```

No arquivo gerado na pasta `src/database/seeds` adicione o código referente à criação de um usuário administrador:

```js
const bcrypt = require("bcryptjs");

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "users",
      [
        {
          name: "Administrador",
          email: "admin@gympoint.com",
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: () => {}
};
```

Agora execute:

```js
yarn sequelize db:seed:all
```

Agora você tem um usuário na sua base de dados, utilize esse usuário para todos logins daqui pra frente.

- A autenticação deve ser feita utilizando JWT.
- Realize a validação dos dados de entrada;

#### 2. Cadastro de alunos

Permita que alunos sejam mantidos (cadastrados/atualizados) na aplicação utilizando nome, email, idade, peso e altura.

Utilize uma nova tabela no banco de dados chamada `students`.

O cadastro de alunos só pode ser feito por administradores autenticados na aplicação.

O aluno não pode se autenticar no sistema, ou seja, não possui senha.

<h3 align="center">
  Desafio 3: Gympoint, continuando a aplicação
</h3>

<blockquote align="center">“Faça seu melhor, mas sempre com prazo de entrega”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-03?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-03/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafio-03?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-entrega">Entrega</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o desafio

Durante esse desafio vamos aprimorar a aplicação Gympoint que demos início no desafio anterior implementando funcionalidades que aprendemos durante as aulas até agora.

### Funcionalidades do administrador

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para administradores.

#### 1. Gestão de planos

Permita que o usuário possa cadastrar planos para matrícula de alunos, o plano deve possuir os seguintes campos:

- title (nome do plano);
- duration (duração em número de meses);
- price (preço mensal do plano);
- created_at;
- updated_at;

Crie alguns planos como por exemplo:

- `Start`: Plano de 1 mês por R\$129;
- `Gold`: Plano de 3 meses por R\$109/mês;
- `Diamond`: Plano de 6 meses por R\$89/mês;

Crie rotas para listagem/cadastro/atualização/remoção de planos;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

#### 2. Gestão de matrículas

Apesar do aluno estar cadastrado na plataforma, isso não significa que o mesmo tem uma matrícula ativa e que pode acessar a academia.

Nessa funcionalidade criaremos um cadastro de matrículas por aluno, a matrícula possui os campos:

- student_id (referência ao aluno);
- plan_id (referência ao plano);
- start_date (data de início da matrícula);
- end_date (date de término da matrícula);
- price (preço total calculado na data da matrícula);
- created_at;
- updated_at;

A **data de início** da matrícula deve ser escolhida pelo usuário.

A **data de término** e **preço** da matrícula deve ser calculada com base no plano selecionado, por exemplo:

Data de início informada: `23/05/2019`
Plano selecionado: `Gold (3 meses)`
Data de término calculada: `23/08/2019 (3 meses depois do início)`
Preço calculado: `R$327`

Quando um aluno **realiza uma matrícula** ele recebe um e-mail com detalhes da sua inscrição na academia como plano, data de término, valor e uma mensagem de boas-vidas.

Crie rotas para listagem/cadastro/atualização/remocação de matrículas;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### Funcionalidades do aluno

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para alunos.

#### 1. Checkins

Quando o aluno chega na academia o mesmo realiza um check-in apenas informando seu ID de cadastro (ID do banco de dados);

Esse check-in serve para monitorar quantas vezes o usuário frequentou a academia na semana.

A tabela de `checkins` possui os campos:

- student_id (referência ao aluno);
- created_at;
- updated_at;

O usuário só pode fazer **5 checkins** dentro de um período de 7 dias corridos.

Exemplo de requisição: `POST https://gympoint.com/students/3/checkins`

Crie uma rota para listagem de todos checkins realizados por um usuário com base em seu ID de cadastro;

Exemplo de requisição: `GET https://gympoint.com/students/3/checkins`

#### 2. Pedidos de auxílio

O aluno pode criar pedidos de auxílio para a academia em relação a algum exercício, alimentação ou instrução qualquer;

A tabela `help_orders` deve conter os seguintes campos:

- student_id (referência ao aluno);
- question (pergunta do aluno em texto);
- answer (resposta da academia em texto);
- answer_at (data da resposta da academia);
- created_at;
- updated_at;

Crie uma rota para a academia listar todos pedidos de auxílio sem resposta;

Crie uma rota para o aluno cadastrar pedidos de auxílio apenas informando seu ID de cadastro (ID do banco de dados);

Exemplo de requisição: `POST https://gympoint.com/students/3/help-orders`

Crie uma rota para listar todos pedidos de auxílio de um usuário com base em seu ID de cadastro;

Exemplo de requisição: `GET https://gympoint.com/students/3/help-orders`

Crie uma rota para a academia responder um pedido de auxílio:

Exemplo de requisição: `POST https://gympoint.com/help-orders/1/answer`

Quando um pedido de auxílio for respondido, o aluno deve receber um e-mail da plataforma com a pergunta e resposta da academia;


## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

