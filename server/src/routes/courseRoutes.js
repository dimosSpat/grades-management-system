const express = require("express");

const router = express.Router();

const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const validate = require("../middlewares/validationMiddleware");

const {
  createCourseValidation,
} = require("../validators/courseValidator");

// GET /api/courses/ - Returns all courses 
router.get("/", getAllCourses);

// GET /api/courses/:id - Returns course by unique id 
router.get("/:id", getCourseById);

router.post(
  "/",
  createCourseValidation,
  validate,
  createCourse
);

router.put(
  "/:id",
  createCourseValidation,
  validate,
  updateCourse
);

router.delete("/:id", deleteCourse);

module.exports = router;