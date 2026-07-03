const { body } = require("express-validator");

const createCourseValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Course name is required"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Course code is required"),

  body("credits")
    .isInt({ min: 1, max: 30 })
    .withMessage("Credits must be between 1 and 30"),

  body("semesterId")
    .isInt({ min: 1 })
    .withMessage("Valid semesterId is required"),

  body("status")
    .optional()
    .isIn([
      "PLANNED",
      "IN_PROGRESS",
      "COMPLETED",
      "DROPPED",
    ])
    .withMessage("Invalid course status"),
];

module.exports = {
  createCourseValidation,
};