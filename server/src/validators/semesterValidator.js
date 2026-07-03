const { body } = require("express-validator");

const createSemesterValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Semester name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Semester name must be between 3 and 100 characters"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);

      if (endDate <= startDate) {
        throw new Error("End date must be after start date");
      }

      return true;
    }),
];

module.exports = {
  createSemesterValidation,
};