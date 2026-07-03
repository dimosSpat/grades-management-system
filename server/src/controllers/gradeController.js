const { Grade, Course } = require("../models");


const getAllGrades = async (req, res, next) => {
  try {
  const grades = await Grade.findAll({
    include: ["course"],
  });

      res.status(201).json(grade);
  } catch (error) {
    next(error);
  }
};

const getGradeById = async (req, res, next) => {
  try {
  const grade = await Grade.findByPk(req.params.id, {
    include: ["course"],
  });

  if (!grade) {
    return res.status(404).json({
      message: "Grade not found",
    });
  }

     res.status(201).json(grade);
  } catch (error) {
    next(error);
  }
};

const createGrade = async (req, res, next) => {
  try {
  const { value, courseId } = req.body;

  const course = await Course.findByPk(courseId);

  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }

  const existingGrade = await Grade.findOne({
    where: {
      courseId,
    },
  });

  if (existingGrade) {
    return res.status(400).json({
      message: "This course already has a grade",
    });
  }

  const grade = await Grade.create({
    value,
    passed: value >= 5,
    courseId,
  });

  await course.update({
    status: "COMPLETED",
  });

      res.status(201).json(grade);
  } catch (error) {
    next(error);
  }
};

const updateGrade = async (req, res, next) => {
  try {
  const grade = await Grade.findByPk(req.params.id);

  if (!grade) {
    return res.status(404).json({
      message: "Grade not found",
    });
  }

  const value = req.body.value;

  await grade.update({
    value,
    passed: value >= 5,
  });

      res.status(201).json(grade);
  } catch (error) {
    next(error);
  }
};

const deleteGrade = async (req, res, next) => {
  try {
  const grade = await Grade.findByPk(req.params.id);

  if (!grade) {
    return res.status(404).json({
      message: "Grade not found",
    });
  }

  await grade.destroy();

      res.status(201).json(grade);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
};