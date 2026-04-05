import { Request, Response } from "express";
import College from "../models/College";

export const getColleges = async (_: Request, res: Response) => {
  const colleges = await College.find();
  res.json(colleges);
};