import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

/* ---------------------------------------------
   AI Tips
---------------------------------------------- */
export const getAITips = () => API.get("/api/ai/tips");

/* ---------------------------------------------
   Readings (User Specific)
---------------------------------------------- */
export const getAllReadings = (userId: string) =>
  API.get(`/api/readings/all?userId=${userId}`);

export const addReading = (data: any) =>
  API.post("/api/readings/add", data);

export const deleteReading = (id: string, userId: string) =>
  API.delete(`/api/readings/${id}?userId=${userId}`);

