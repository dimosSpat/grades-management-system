const { Semester, Course, Grade } = require("../models");

const getAllSemesters = async (req, res, next) => {
  try {
    const semesters = await Semester.findAll({
      order: [["startDate", "DESC"]],
    });

    res.status(200).json(semesters);
  } catch (error) {
    next(error);
  }
};

const getSemesterById = async (req, res, next) => {
  try {
    const semester = await Semester.findByPk(req.params.id, {
      include: ["courses"],
    });

    if (!semester) {
      return res.status(404).json({
        message: "Semester not found",
      });
    }

    res.status(200).json(semester);
  } catch (error) {
    next(error);
  }
};

const createSemester = async (req, res, next) => {
  try {
    const { name, startDate, endDate } = req.body;

    const semester = await Semester.create({
      name,
      startDate,
      endDate,
    });

    res.status(201).json(semester);
  } catch (error) {
    next(error);
  }
};

const updateSemester = async (req, res, next) => {
  try {
    const semester = await Semester.findByPk(req.params.id);

    if (!semester) {
      return res.status(404).json({
        message: "Semester not found",
      });
    }

    await semester.update(req.body);

    res.status(200).json(semester);
  } catch (error) {
    next(error);
  }
};

const deleteSemester = async (req, res, next) => {
  try {
    const semester = await Semester.findByPk(req.params.id);

    if (!semester) {
      return res.status(404).json({
        message: "Semester not found",
      });
    }

    await semester.destroy();

    res.status(200).json({
      message: "Semester deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getSemesterSummary = async (req, res, next) => {
  try {
    const semester = await Semester.findByPk(req.params.id, {
      include: [
        {
          model: Course,
          as: "courses",
          include: [
            {
              model: Grade,
              as: "grade",
            },
          ],
        },
      ],
    });

    if (!semester) {
      return res.status(404).json({
        success: false,
        message: "Semester not found",
      });
    }

    const courses = semester.courses;

    const totalCourses = courses.length;

    const completedCourses = courses.filter(
      (course) => course.status === "COMPLETED"
    ).length;

    const passedCourses = courses.filter(
      (course) =>
        course.grade && course.grade.passed
    ).length;

    const totalCredits = courses.reduce(
      (sum, course) => sum + course.credits,
      0
    );

    const earnedCredits = courses
      .filter(
        (course) =>
          course.grade && course.grade.passed
      )
      .reduce(
        (sum, course) => sum + course.credits,
        0
      );

    const remainingCredits =
      totalCredits - earnedCredits;

    const gradedCourses = courses.filter(
      (course) => course.grade
    );

    const averageGrade =
      gradedCourses.length > 0
        ? (
            gradedCourses.reduce(
              (sum, course) =>
                sum + course.grade.value,
              0
            ) / gradedCourses.length
          ).toFixed(2)
        : 0;

    let weightedPoints = 0;
    let weightedCredits = 0;

    gradedCourses.forEach((course) => {
      weightedPoints +=
        course.grade.value * course.credits;

      weightedCredits += course.credits;
    });

    const gpa =
      weightedCredits > 0
        ? (
            weightedPoints /
            weightedCredits
          ).toFixed(2)
        : 0;

    res.status(200).json({
      success: true,
      data: {
        semester: {
          id: semester.id,
          name: semester.name,
          startDate: semester.startDate,
          endDate: semester.endDate,
        },

        statistics: {
          totalCourses,
          completedCourses,
          passedCourses,
          averageGrade,
          gpa,
          totalCredits,
          earnedCredits,
          remainingCredits,
        },

        courses,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSemesters,
  getSemesterById,
  createSemester,
  updateSemester,
  deleteSemester,
  getSemesterSummary,
};