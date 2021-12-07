### Exercicios de fixação do bloco 26.4 - Express: HTTP com Node.js

Repositório com os exercicios de fixação realizados durante o acompanhamento do conteúdo no course (plataforma)

Resumo de alguns passos executados (para consulta posterior);

1. `npm init -y` para iniciar config NodeJs;
2. `npm i express` para instalar o express;
3. Editou-se o package.json para incluir o script "start" : "node index.js" para rodar o interpretador de código contido no arquivo "index.js" via comando npm start (uso exclusivo do script start - demais "npm run /nome-do-script/);
4. `npm i nodemon -D` instalação do nodemon para automatizar a dinâmica de parar e inicializar o servidor a cada alteração/salvamento de código/arquivo;
5. Indlusão do script "dev" no package.json para executar o nodemon:

```
{
  "scripts": {
    "test": ...,
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

logo, para executar o nodemon basta `npm run dev` no terminal; 6. Instalei o [**httpie** ](https://httpie.io/docs#installation) que é uma ferramenta que possibilita enviar requisições com params, body, headers via command line no terminal;

- Lembrando que o terminal onde o nodemon estiver ativo não será possível utilizar o **httpie**, logo, se optar por manter o nodemon rodando, para enviar requisições via **httpie** será necessário abrir outro terminal e entrar na pasta do projeto `cd <pasta-do-projeto>`;
- Outro ponto importante de se ressaltar é que o **httpie** é uma ferramenta instalada globalmente (não é dependencia do projeto nem "DevDependencies"). para instalar via Ubuntu basta executar no terminal `sudo apt update $$ sudo apt install httpie`.

7. Uma dependencia importante que permite o back-end interpretar os dados enviados via requisição http, que são "comprimidos" e remontá-los através de um processo de "parseamento" (não sei se essa expressão existe rs), em outras palavras, conversão das informações para um formato, nos casos desse repo, o JSON. Portanto para instalar esse pacote basta executar `npm i body-parser` e importá-lo no arquivo **index.js** através da sintaxe abaixo:

```
// const express = require('express');
const bodyParser = require('body-parser');

// const app = express();
app.use(bodyParser.json());

// ...
```

Nesse repositório estão alguns exercícios realizados por mim durante o acompanhamento do conteúdo do bloco 26.4 - Express: HTTP com Node.js.

- Após instanciar uma aplicação com o Express, executei requisições entre client e o servidor local dos tipos `GET`, `POST`, `PUT` e `DELETE`;
- Foi possível experienciar formas de comunicação entre o front-end e o back-end acessando propriedades da requisição tais como o `req.params`, `req.query`, `req.body` e `req.header`;
- Realizei tratando de erros e respostas com status code padrão do HTML, mensagens customizadas e informações em formato JSON.
