const express = require("express");
const router = express.Router();

const {
  getAllSemesters,
  getSemesterById,
  createSemester,
  updateSemester,
  deleteSemester,
  getSemesterSummary,
} = require("../controllers/semesterController");

const validate = require("../middlewares/validationMiddleware");

const {
  createSemesterValidation,
} = require("../validators/semesterValidator");

router.get("/", getAllSemesters);

router.get("/:id/summary", getSemesterSummary);

router.get("/:id", getSemesterById);

router.post(
  "/",
  createSemesterValidation,
  validate,
  createSemester
);

router.put(
  "/:id",
  createSemesterValidation,
  validate,
  updateSemester
);

router.delete("/:id", deleteSemester);

module.exports = router;