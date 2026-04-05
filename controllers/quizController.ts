import { Request, Response } from "express";
import User from "../models/User";

// ✅ SAVE QUIZ RESULT
export const saveQuiz = async (req: any, res: Response) => {
  try {
    const { skills, interests } = req.body;

    if (!skills || !interests) {
      return res.status(400).json({ msg: "Skills & Interests required" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { skills, interests },
      { new: true }
    ).select("-password");

    res.json({
      msg: "Profile updated successfully",
      user,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};