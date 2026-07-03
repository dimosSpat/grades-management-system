const { Semester, Course, Grade } = require("../models");

const getStats = async (req, res, next) => {
  try {
    // ===== Basic statistics =====

    const totalSemesters = await Semester.count();

    const totalCourses = await Course.count();

    const completedCourses = await Course.count({
      where: {
        status: "COMPLETED",
      },
    });

    const passedCourses = await Grade.count({
      where: {
        passed: true,
      },
    });

    // ===== Average grade =====

    const grades = await Grade.findAll();

    const averageGrade =
      grades.length > 0
        ? (
            grades.reduce((sum, grade) => sum + grade.value, 0) /
            grades.length
          ).toFixed(2)
        : 0;

    // ===== Credits =====

    const totalCredits = (await Course.sum("credits")) || 0;

    // ===== GPA Calculation =====

    const gradesWithCourses = await Grade.findAll({
      include: ["course"],
    });

    let totalWeightedPoints = 0;
    let totalWeightedCredits = 0;

    gradesWithCourses.forEach((grade) => {
      totalWeightedPoints +=
        grade.value * grade.course.credits;

      totalWeightedCredits +=
        grade.course.credits;
    });

    const gpa =
      totalWeightedCredits > 0
        ? (
            totalWeightedPoints /
            totalWeightedCredits
          ).toFixed(2)
        : 0;

    // ===== Earned Credits =====

    const earnedCredits = gradesWithCourses
      .filter((grade) => grade.passed)
      .reduce((sum, grade) => {
        return sum + grade.course.credits;
      }, 0);

    // ===== Response =====

    res.status(200).json({
      totalSemesters,
      totalCourses,
      completedCourses,
      passedCourses,
      averageGrade,
      gpa,
      totalCredits,
      earnedCredits,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
};