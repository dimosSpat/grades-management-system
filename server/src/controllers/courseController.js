const { Op } = require("sequelize");
const { Course, Semester, Grade } = require("../models");

/**
 * GET /api/courses
 * Get all courses with filtering, search, sorting and pagination
 */
const getAllCourses = async (req, res, next) => {
  try {
    const {
      semesterId,
      status,
      search,
      sort = "name",
      order = "ASC",
      page = 1,
      limit = 10,
    } = req.query;

    // Build filters
    const where = {};

    if (semesterId) {
      where.semesterId = Number(semesterId);
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          code: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    // Validate sorting
    const allowedSortFields = [
      "name",
      "code",
      "credits",
      "status",
      "createdAt",
      "updatedAt",
    ];

    const sortField = allowedSortFields.includes(sort)
      ? sort
      : "name";

    const sortOrder =
      order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

    // Pagination
    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Math.min(100, Number(limit) || 10));

    const offset = (currentPage - 1) * pageSize;

    const totalItems = await Course.count({ where });

    const courses = await Course.findAll({
      where,

      include: [
        {
          model: Semester,
          as: "semester",
        },
        {
          model: Grade,
          as: "grade",
        },
      ],

      order: [[sortField, sortOrder]],

      limit: pageSize,

      offset,
    });

    res.status(200).json({
      success: true,

      pagination: {
        page: currentPage,
        limit: pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
      },

      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/courses/:id
 */
const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: Semester,
          as: "semester",
        },
        {
          model: Grade,
          as: "grade",
        },
      ],
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/courses
 */
const createCourse = async (req, res, next) => {
  try {
    const {
      name,
      code,
      credits,
      status,
      semesterId,
    } = req.body;

    const semester = await Semester.findByPk(semesterId);

    if (!semester) {
      return res.status(404).json({
        success: false,
        message: "Semester not found",
      });
    }

    const existingCourse = await Course.findOne({
      where: {
        code,
      },
    });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course code already exists",
      });
    }

    const course = await Course.create({
      name,
      code,
      credits,
      status,
      semesterId,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/courses/:id
 */
const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.update(req.body);

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/courses/:id
 */
const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.destroy();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};