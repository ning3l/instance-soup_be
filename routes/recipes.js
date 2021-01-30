const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// get all recipes + author table
router.get("/", recipeController.getAll);

// get details for single recipe
router.get("/:id", recipeController.getSingle);

module.exports = router;
