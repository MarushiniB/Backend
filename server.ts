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

app.use(cors({
  origin: "https://client-eta-three-93.vercel.app",
  credentials: true
}));
app.use(express.json());

app.use("/api/quiz", quizRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (_, res) => {
  res.send("API Running...");
});

// Use PORT from environment or fallback to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server  running on port ${PORT}`);
});
