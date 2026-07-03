const { body } = require("express-validator");

const createGradeValidation = [
  body("value")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Grade must be between 0 and 10"),

  body("courseId")
    .isInt({ min: 1 })
    .withMessage("Valid courseId is required"),
];

module.exports = {
  createGradeValidation,
};