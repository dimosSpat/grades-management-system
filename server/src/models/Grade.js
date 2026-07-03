const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Grade = sequelize.define(
  "Grade",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },

    passed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "grades",
    timestamps: true,
  }
);

module.exports = Grade;