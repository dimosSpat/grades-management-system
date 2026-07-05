import axios from "./axios";

export const getSemesters = async () => {
  const response = await axios.get("/semesters");

  return response.data;
};