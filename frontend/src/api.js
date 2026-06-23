import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/dishes";

export const getDishes = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

export const toggleDishStatus = async (dishId) => {
  const res = await axios.patch(`${API_BASE_URL}/${dishId}/toggle`);
  return res.data;
};