import { Request, Response } from "express";

export const getJobs = (req: Request, res: Response) => {
  const { skills } = req.body;

  let jobs = [];

  if (skills.includes("Python")) {
    jobs.push("Data Analyst", "ML Engineer");
  }

  if (skills.includes("Frontend")) {
    jobs.push("Frontend Developer");
  }

  res.json(jobs);
};