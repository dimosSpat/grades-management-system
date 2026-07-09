import axios from "./axios";

export const getCourses = async (params = {}) => {
  const response = await axios.get("/courses", {
    params,
  });

  return response.data.data;
};

export const createCourse = async (course) => {
  const response = await axios.post("/courses", course);

  return response.data.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await axios.put(
    `/courses/${id}`,
    courseData
  );

  return response.data.data;
};

export const deleteCourse = async (id) => {
  const response = await axios.delete(
    `/courses/${id}`
  );

  return response.data;
};