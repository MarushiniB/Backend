import axios from "axios";

export const getPrediction = async (data: any) => {
  const res = await axios.post("http://localhost:5001/predict", data);
  return res.data;
};export const analyzeResume = async (text: string) => {
    const skills = [];

  if (text.includes("python")) skills.push("Python");
  if (text.includes("react")) skills.push("Frontend");
  if (text.includes("excel")) skills.push("Data Analysis");

  return skills;
};