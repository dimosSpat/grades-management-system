const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },

    status: {
      type: DataTypes.ENUM(
        "PLANNED",
        "IN_PROGRESS",
        "COMPLETED",
        "DROPPED"
      ),
      allowNull: false,
      defaultValue: "PLANNED",
    },
  },
  {
    tableName: "courses",
    timestamps: true,
  }
);

module.exports = Course;