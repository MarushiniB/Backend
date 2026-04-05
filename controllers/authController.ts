import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
// 🔐 REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    console.log("📥 REGISTER REQUEST BODY:", req.body);

    const { name, email, password, role } = req.body;

    console.log("🎯 ROLE RECEIVED:", role);

    // ✅ Validation
    if (!name || !email || !password || !role) {
      console.log("❌ Missing fields");
      return res.status(400).json({ msg: "All fields are required" });
    }

    // ✅ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ msg: "User already exists" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "school",
    });

    await user.save();

    console.log("✅ USER SAVED IN DB:", user);

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "123456",
      { expiresIn: "7d" }
    );

    console.log("🔑 TOKEN GENERATED");

    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("🔥 REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error during registration" });
  }
};
// ✅ GET PROFILE
export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching profile" });
  }
};

// ✅ UPDATE PROFILE (skills + interests)
export const updateProfile = async (req: any, res: Response) => {
  try {
    const { skills, interests } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { skills, interests },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error updating profile" });
  }
};

// 🔐 LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    console.log("📥 LOGIN REQUEST BODY:", req.body);

    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      console.log("❌ Missing login fields");
      return res.status(400).json({ msg: "Email and password required" });
    }

    // ✅ Check user
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ msg: "User not found" });
    }

    console.log("👤 USER FOUND:", user.email, "| ROLE:", user.role);

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Invalid password");
      return res.status(400).json({ msg: "Invalid password" });
    }

    console.log("✅ PASSWORD MATCH");

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "123456",
      { expiresIn: "7d" }
    );

    console.log("🔑 LOGIN SUCCESS | ROLE:", user.role);

    res.json({
      msg: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error during login" });
  }
};