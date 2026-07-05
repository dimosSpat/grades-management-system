import axios from "./axios";

export const getCourses = async (params = {}) => {
  const response = await axios.get("/courses", {
    params,
  });

  return response.data;
};

export const createCourse = async (course) => {
  const response = await axios.post("/courses", course);

  return response.data;
};