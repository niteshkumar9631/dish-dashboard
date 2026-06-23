import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/dishes`;

export const getDishes = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

export const toggleDishStatus = async (dishId) => {
  const res = await axios.patch(`${API_BASE_URL}/${dishId}/toggle`);
  return res.data;
};

export const addDish = async (dishData) => {
  const res = await axios.post(API_BASE_URL, dishData);
  return res.data;
};