const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const semesterRoutes = require("./routes/semesterRoutes");
const courseRoutes = require("./routes/courseRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/dashboard", dashboardRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

// Creates path for routes
app.use("/api/semesters", semesterRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/grades", gradeRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;