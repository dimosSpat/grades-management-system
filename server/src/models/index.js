const Semester = require("./Semester");
const Course = require("./Course");
const Grade = require("./Grade");

// Semester -> Course

Semester.hasMany(Course, {
  foreignKey: "semesterId",
  as: "courses",
  onDelete: "CASCADE",
});

Course.belongsTo(Semester, {
  foreignKey: "semesterId",
  as: "semester",
});

// Course -> Grade

Course.hasOne(Grade, {
  foreignKey: "courseId",
  as: "grade",
  onDelete: "CASCADE",
});

Grade.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

module.exports = {
  Semester,
  Course,
  Grade,
};