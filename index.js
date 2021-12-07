const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
// simulando um banco de dados (vamos comecar com uma lista)

const recipes = [
  { id: 1, name: "Lasanha", price: 40.0, waitTime: 30 },
  { id: 2, name: "Macarrão a Bolonhesa", price: 35.0, waitTime: 25 },
  { id: 3, name: "Macarrão com molho branco", price: 35.0, waitTime: 25 },
];

const drinks = [
  { id: 1, name: "Refrigerante Lata", price: 5.0 },
  { id: 2, name: "Refrigerante 600ml", price: 8.0 },
  { id: 3, name: "Suco 300ml", price: 4.0 },
  { id: 4, name: "Suco 1l", price: 10.0 },
  { id: 5, name: "Cerveja Lata", price: 4.5 },
  { id: 6, name: "Água Mineral 500 ml", price: 5.0 },
];

app.get("/recipes", (_req, res) => {
  const sortRecipes = recipes.sort((a, b) => (a.name > b.name && 1) || -1);
  res.json(sortRecipes);
});

// setando o metodo post para cadastrar uma receita (utilizando a propriedade body da requisição)
app.post("/recipes", (req, res) => {
  const { id, name, price, waitTime } = req.body;
  recipes.push({ id, name, price, waitTime });
  res.status(201).json({ message: "Recipe added sucessfully!" });
});

app.get("/drinks", (_req, res) => {
  const sortDrinks = drinks.sort((a, b) => (a.name > b.name && 1) || -1);
  res.json(sortDrinks);
});

app.post("/drinks", (req, res) => {
  const { id, name, price } = req.body;
  drinks.push({ id, name, price });
  res.status(201).json({ message: "Drink added sucessfully!" });
});

app.get("/recipes/search", (req, res) => {
  const { name, maxPrice, minPrice } = req.query;
  const filteredRecipes = recipes.filter(
    (item) =>
      item.name.includes(name) &&
      item.price < parseInt(maxPrice) &&
      item.price >= parseInt(minPrice)
  );
  res.status(200).json(filteredRecipes);
});

app.get("/drinks/search", (req, res) => {
  const { name } = req.query;
  const filteredDrinks = drinks.filter((item) => item.name.includes(name));
  if (!filteredDrinks)
    return res.status(404).json({ message: "id not found!" });
  res.status(200).json(filteredDrinks);
});

// ⚠️ Observação: Quando houver rotas com um mesmo radical e uma destas utilizar parâmetro de rota, as rotas mais específicas devem ser definidas sempre antes. Isso porque o Express ao resolver uma rota vai olhando rota por rota qual corresponde a URL que chegou. Se colocamos a rota /recipes/search depois da rota /recipes/:id , o Express vai entender que a palavra search como um id e vai chamar a callback da rota /recipes/:id . Tenha atenção a esse detalhe ao utilizar rotas similares na definição da sua API.

// Portanto, via de regra, rotas com parametros mais genéricos, como o caso das rotas abaixo que utilizam ":id", devem ser declaradas no escopo após (no final) das rotas mais específicas.

// GET
app.get("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find((item) => item.id === parseInt(id)); // Foi necessário converter para integer respeitando a tipagem do dado utilizado na declaracao do array (banco de dados), pois por padrão, todo parametro de rota é retornado como string.
  // retorno de um erro esperado
  if (!recipe) return res.status(404).json({ message: "Recipe not found!" }); // O "return" aqui é importante para 'quebrar' o fluxo, ou seja, não executar a linha seguinte. Caiu no erro, mostra a mensagem e para a execução.
  // Por isso é preciso ter cuidado para sempre que existir uma condição que pode quebrar o fluxo principal colocar um return antes do res.json para não ter esse problema. Este é um erro bem comum para quem está começando a utilizar Express, então caso tenha esse problema, você já sabe o que fazer a partir de agora.

  res.status(200).json(recipe);
});

// PUT
app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  // Para editar o item do array, primeiro encontramos o index;
  const recipeIndex = recipes.findIndex((item) => item.id === parseInt(id));
  if (recipeIndex === -1)
    return res.status(404).json({ message: "Recipe not found!" });
  console.log(recipes[recipeIndex]);
  recipes[recipeIndex] = { ...recipes[recipeIndex], name, price };
});

// DELETE
app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex((item) => item.id === parseInt(id));
  if (recipeIndex === -1)
    return res.status(404).json({ message: "Recipe not found!" });
  recipes.splice(recipeIndex, 1);
  res.status(204).end();
});

// ================== DRINKS ===============================

app.get("/drinks/:id", (req, res) => {
  // note que req é um objeto que possui a propriedade params;
  const { id } = req.params;
  const drink = drinks.find((item) => item.id == parseInt(id));
  res.status(200).json(drink);
});

app.put("/drinks/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const drinkIndex = drinks.findIndex((item) => item.id === parseInt(id));
  if (drinkIndex === -1)
    return res.status(404).json({ message: "Drink not found!" });
  drinks[drinkIndex] = { ...drinks[drinkIndex], name, price };
  res.status(204).end();
});

app.delete("/drinks/:id", (req, res) => {
  const { id } = req.params;
  const drinkIndex = drinks.findIndex((item) => item.id === parseInt(id));
  if (drinkIndex === -1)
    return res.status(404).json({ message: "Drink not found!" });
  drinks.splice(drinkIndex, 1);
  res.status(204).end();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`o pai tá on na porta ${PORT}`));
