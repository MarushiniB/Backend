import { Request, Response } from "express";
import Course from "../models/Course";

export const getCourses = async (_: Request, res: Response) => {
  const courses = await Course.find();
  res.json(courses);
};