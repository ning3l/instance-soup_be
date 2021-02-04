const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const {
  inputValidator,
  validationRules,
} = require("../middleware/inputValidator");

// get all recipes + author table
router.get("/", recipeController.getAll);

// create a new recipe
//router.post("/", validationRules(), inputValidator, recipeController.addRecipe);
router.post("/", recipeController.addRecipe);

// get details for single recipe
router.get("/:id", recipeController.getSingle);

// delete recipe
router.delete("/:id", recipeController.deleteRecipe);

// update recipe
router.put(
  "/:id",
  validationRules(),
  inputValidator,
  recipeController.updateRecipe
);

module.exports = router;
