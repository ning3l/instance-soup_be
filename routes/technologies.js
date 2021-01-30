const express = require("express");
const router = express.Router();
const technoController = require("../controllers/technologyController");

// get all technologies
router.get("/", technoController.getAll);

// get all technologies used by a specific recipe, based on recipe id
router.get("/:id", technoController.getForSingle);

module.exports = router;
