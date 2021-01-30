const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filterController");

// filter db based on query for technologies AND/OR spiciness
router.get("/", filterController.query);

module.exports = router;
