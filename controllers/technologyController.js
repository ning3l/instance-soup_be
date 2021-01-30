const db = require("../db/client");

const technoController = {
  getAll: (req, res) => {
    db.query("SELECT * FROM technology")
      .then((data) => res.json(data.rows))
      .catch((err) => console.log(err));
  },
  getForSingle: (req, res) => {
    const { id } = req.params;
    db.query(
      "SELECT name AS techno_name FROM recipe_technology INNER JOIN technology ON recipe_technology.technology_id = technology.id WHERE recipe_id = $1",
      [id]
    )
      .then((data) => res.json(data.rows))
      .catch((err) => console.log(err));
  },
};

module.exports = technoController;
