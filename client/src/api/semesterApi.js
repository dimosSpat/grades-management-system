import axios from "./axios";

export const getSemesters = async () => {
  const response = await axios.get("/semesters");
  return response.data;
};

export const createSemester = async (
  semester
) => {
  const response = await axios.post(
    "/semesters",
    semester
  );

  return response.data;
};

export const updateSemester = async (
  id,
  semester
) => {
  const response = await axios.put(
    `/semesters/${id}`,
    semester
  );

  return response.data;
};

export const deleteSemester = async (
  id
) => {
  const response = await axios.delete(
    `/semesters/${id}`
  );

  return response.data;
};