"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.updateProfile = exports.getProfile = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// 🔐 REGISTER
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            console.log("⚠️ User already exists:", email);
            return res.status(400).json({ msg: "User already exists" });
        }
        // ✅ Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // ✅ Create user
        const user = new User_1.default({
            name,
            email,
            password: hashedPassword,
            role: role || "school",
        });
        yield user.save();
        console.log("✅ USER SAVED IN DB:", user);
        // ✅ Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "123456", { expiresIn: "7d" });
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
    }
    catch (err) {
        console.error("🔥 REGISTER ERROR:", err);
        res.status(500).json({ msg: "Server error during registration" });
    }
});
exports.register = register;
// ✅ GET PROFILE
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ msg: "Error fetching profile" });
    }
});
exports.getProfile = getProfile;
// ✅ UPDATE PROFILE (skills + interests)
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skills, interests } = req.body;
        const user = yield User_1.default.findByIdAndUpdate(req.user.id, { skills, interests }, { new: true });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ msg: "Error updating profile" });
    }
});
exports.updateProfile = updateProfile;
// 🔐 LOGIN
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📥 LOGIN REQUEST BODY:", req.body);
        const { email, password } = req.body;
        // ✅ Validation
        if (!email || !password) {
            console.log("❌ Missing login fields");
            return res.status(400).json({ msg: "Email and password required" });
        }
        // ✅ Check user
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(400).json({ msg: "User not found" });
        }
        console.log("👤 USER FOUND:", user.email, "| ROLE:", user.role);
        // ✅ Compare password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Invalid password");
            return res.status(400).json({ msg: "Invalid password" });
        }
        console.log("✅ PASSWORD MATCH");
        // ✅ Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "123456", { expiresIn: "7d" });
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
    }
    catch (err) {
        console.error("🔥 LOGIN ERROR:", err);
        res.status(500).json({ msg: "Server error during login" });
    }
});
exports.login = login;
