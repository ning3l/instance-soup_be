const { body, validationResult } = require("express-validator");

function validationRules() {
  return [
    // author_id is int
    body("author_id").isNumeric(),
    // title min/max length
    body("title").isLength({ min: 5, max: 35 }),
    // abstract min/max length
    body("abstract").isLength({ min: 20, max: 70 }),
    // date is date
    body("date").isDate(),
    // spiciness min/max length
    body("spiciness").isLength({ min: 3, max: 20 }),
    // description min/max length
    body(" description").isLength({ min: 200, max: 550 }),
    // main_text min/max length
    body("main_text").isLength({ min: 500, max: 1230 }),
    // code_snipped not null
    body("code_snippet").not().isEmpty(),
    //img_url not null
    body("img_url").not().isEmpty(),
    // check if technologies is arr of min length two
    body("technologies").isArray({ min: 1 }),
  ];
}

function inputValidator(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = [];
    errors
      .array()
      .forEach((err) => formattedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: formattedErrors });
  } else {
    next();
  }
}

module.exports = { inputValidator, validationRules };
