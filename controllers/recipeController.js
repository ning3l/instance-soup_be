const db = require("../db/client");

const recipeController = {
  getAll: (req, res) => {
    db.query(
      "SELECT * FROM recipe INNER JOIN author ON recipe.author_id = author.id"
    )
      .then((data) => res.json(data.rows))
      .catch((err) => console.log(err));
  },
  getSingle: (req, res) => {
    const { id } = req.params;
    db.query(
      "SELECT * FROM recipe INNER JOIN author ON recipe.author_id = author.id WHERE recipe.id = $1",
      [id]
    )
      .then((data) => res.json(data.rows))
      .catch((err) => console.log(err));
  },
};

module.exports = recipeController;
