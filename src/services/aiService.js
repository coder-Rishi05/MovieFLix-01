import axios from "axios";

export const askAI = async (message) => {
  const res = await axios.post("/api/chat", { message });
  return res.data;
};