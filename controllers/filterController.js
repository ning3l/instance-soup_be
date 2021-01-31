const db = require("../db/client");
const buildSearch = require("../utils/queryBuilder");

const filterController = {
  query: (req, res) => {
    const { techno_name, spiciness } = req.query;
    // check that query string is not empty
    if (!spiciness && !techno_name) return;
    // if no techno_name is present, do a simple db query based only on spiciness
    if (spiciness && !techno_name) {
      db.query(
        "SELECT id, title, abstract, spiciness, date_created FROM recipe WHERE spiciness = $1",
        [spiciness]
      )
        .then((data) => res.json(data.rows))
        .catch((err) => console.log(err));
    } else {
      // use buildSearch to create condition str and placeholder arr
      let queryObj = buildSearch(req.query);
      let condition = "";
      let vals = [];
      if (queryObj.spiceCondition && queryObj.technoSearch) {
        condition += "WHERE " + queryObj.spiceCondition + queryObj.technoSearch;
        vals = [queryObj.spiceVal, ...queryObj.technoVals];
      } else {
        condition += "WHERE " + queryObj.technoSearch;
        vals = [...queryObj.technoVals];
      }
      db.query(
        `WITH prev AS (SELECT title, name AS techno FROM recipe_technology INNER JOIN recipe ON recipe_technology.recipe_id = recipe.id INNER JOIN technology ON recipe_technology.technology_id = technology.id ${condition}) SELECT COUNT(prev.title) AS total, prev.title FROM prev GROUP BY title HAVING COUNT(prev.title) = ${queryObj.technoVals.length} `,
        vals
      )
        .then((data) => res.json(data.rows))
        .catch((err) => console.log(err));
    }
  },
};

module.exports = filterController;
