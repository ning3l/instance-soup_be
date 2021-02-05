const db = require("../db/client");

const recipeController = {
  getAll: (req, res) => {
    db.query(
      "SELECT r.id, a.name AS author, r.title, r.abstract, r.date_created, r.spiciness, r.description, r.main_text, r.code_snippet, r.img_url FROM recipe r INNER JOIN author a ON r.author_id = a.id ORDER BY id"
    )
      .then((data) => res.json(data.rows))
      .catch((err) => console.log(err));
  },
  getSingle: (req, res) => {
    const { id } = req.params;
    db.query(
      "SELECT r.id, a.name AS author, r.title, r.abstract, r.date_created, r.spiciness, r.description, r.main_text, r.code_snippet, r.img_url FROM recipe r INNER JOIN author a ON r.author_id = a.id WHERE r.id=$1",
      [id]
    )
      .then((data) => res.json(data.rows))
      .catch((err) => console.log(err));
  },
  addRecipe: (req, res) => {
    const {
      author_id,
      title,
      abstract,
      date_created,
      spiciness,
      description,
      main_text,
      code_snippet,
      img_url,
      technologies,
    } = req.body;
    db.query(
      `WITH query_one(newid) AS (INSERT INTO recipe (author_id, title, abstract, date_created, spiciness, description, main_text, code_snippet, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id)INSERT INTO recipe_technology(recipe_id, technology_id) SELECT newid, x FROM query_one, unnest(ARRAY[${technologies}]) t(x) RETURNING *`,
      [
        author_id,
        title,
        abstract,
        date_created,
        spiciness,
        description,
        main_text,
        code_snippet,
        img_url,
      ]
    )
      .then((data) => res.json(data.rows))
      .catch((err) => console.log(err));
  },
  deleteRecipe: (req, res) => {
    let pw = req.header("Authorization");
    if (!pw || pw !== process.env.PW) {
      return res.sendStatus(401);
    }
    const { id } = req.params;
    db.query(
      "WITH first_query AS (DELETE FROM recipe_technology WHERE recipe_id = $1) DELETE FROM recipe WHERE id = $1 RETURNING *;",
      [id]
    )
      .then((data) => res.json(data.rows))
      .catch((err) => console.log(err));
  },
  updateRecipe: (req, res) => {
    let pw = req.header("Authorization");
    if (!pw || pw !== process.env.PW) {
      return res.sendStatus(401);
    }
    const { id } = req.params;
    const {
      author_id,
      title,
      abstract,
      date_created,
      spiciness,
      description,
      main_text,
      code_snippet,
      img_url,
    } = req.body;
    db.query(
      "UPDATE recipe SET author_id=$1, title=$2, abstract=$3, date_created=$4, spiciness=$5, description=$6, main_text=$7, code_snippet=$8, img_url=$9 WHERE id=$10 RETURNING *",
      [
        author_id,
        title,
        abstract,
        date_created,
        spiciness,
        description,
        main_text,
        code_snippet,
        img_url,
        id,
      ]
    )
      .then((data) => res.json(data.rows))
      .catch((err) => console.log(err));
  },
};

module.exports = recipeController;
