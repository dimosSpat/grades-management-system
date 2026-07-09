import axios from "./axios";

export const getGrades = async () => {
  const response = await axios.get("/grades");
  return response.data;
};

export const createGrade = async (grade) => {
  const response = await axios.post("/grades", grade);
  return response.data;
};

export const updateGrade = async (id, grade) => {
  const response = await axios.put(`/grades/${id}`, grade);
  return response.data;
};

export const deleteGrade = async (id) => {
  const response = await axios.delete(`/grades/${id}`);
  return response.data;
};