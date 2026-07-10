const express = require("express");

const router = express.Router();

const {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
} = require("../controllers/gradeController");

const validate = require("../middlewares/validationMiddleware");

const authenticateToken = require("../middlewares/authMiddleware");

const {
  createGradeValidation,
} = require("../validators/gradeValidator");

router.use(authenticateToken);

router.get("/", getAllGrades);

router.get("/:id", getGradeById);

router.post(
  "/",
  createGradeValidation,
  validate,
  createGrade
);

router.put(
  "/:id",
  createGradeValidation,
  validate,
  updateGrade
);

router.delete("/:id", deleteGrade);


module.exports = router;