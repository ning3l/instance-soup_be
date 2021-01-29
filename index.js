require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/client");

app.use(bodyParser.json());

// get all recipes + author table
app.get("/", (req, res) => {
  db.query(
    "SELECT * FROM recipe INNER JOIN author ON recipe.author_id = author.id"
  )
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
});

// HARDCODED FOR NOW, later depends on queryBuilder in utils
// handle user queries - spiciness, technology,
app.get("/test", (req, res) => {
  const { techno_name, spiciness } = req.query;
  let param1 = "css";
  let param2 = "html";
  let conditions = "WHERE name = $1 OR name = $2";
  db.query(
    `WITH prev AS (SELECT title, name AS techno FROM recipe_technology INNER JOIN recipe ON recipe_technology.recipe_id = recipe.id INNER JOIN technology ON recipe_technology.technology_id = technology.id ${conditions}) SELECT COUNT(prev.title) AS total, prev.title FROM prev GROUP BY title HAVING COUNT(prev.title) > 1`,
    [param1, param2]
    // make > 1 dynamic with less then length of query params arr
  )
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
});

// get all technologies used by a specific recipe
app.get("/techno/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT name AS techno_name FROM recipe_technology INNER JOIN technology ON recipe_technology.technology_id = technology.id WHERE recipe_id = $1",
    [id]
  )
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
});

// get single recipes + author table
app.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM recipe INNER JOIN author ON recipe.author_id = author.id WHERE recipe.id = $1",
    [id]
  )
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

/*

// JUNCTION TABLE FOR QUERY STRINGS

WITH prev AS (SELECT title, name AS techno FROM recipe_technology
INNER JOIN recipe ON recipe_technology.recipe_id = recipe.id
INNER JOIN technology ON recipe_technology.technology_id = technology.id
WHERE name = 'CSS' OR name = 'HTML')
SELECT COUNT(prev.title) AS total, prev.title FROM prev
GROUP BY title
HAVING COUNT(prev.title) > 1;

*/
