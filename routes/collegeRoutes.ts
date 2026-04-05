import express from "express";
import { getColleges } from "../controllers/collegeController";

const router = express.Router();

router.get("/", getColleges);

export default router;