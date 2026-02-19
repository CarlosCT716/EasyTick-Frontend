import axios from "axios";

const API_URL = "http://localhost:8081/api/events";

export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};