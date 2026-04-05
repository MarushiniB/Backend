import express from "express";
import { saveQuiz } from "../controllers/quizController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ PROTECTED ROUTE
router.post("/", protect, saveQuiz);

export default router;