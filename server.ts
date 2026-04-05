import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

import quizRoutes from "./routes/quizRoutes";
import courseRoutes from "./routes/courseRoutes";
import collegeRoutes from "./routes/collegeRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/quiz", quizRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (_, res) => {
  res.send("API Running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});