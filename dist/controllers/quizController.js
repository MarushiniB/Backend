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
exports.saveQuiz = void 0;
const User_1 = __importDefault(require("../models/User"));
// ✅ SAVE QUIZ RESULT
const saveQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skills, interests } = req.body;
        if (!skills || !interests) {
            return res.status(400).json({ msg: "Skills & Interests required" });
        }
        const user = yield User_1.default.findByIdAndUpdate(req.userId, { skills, interests }, { new: true }).select("-password");
        res.json({
            msg: "Profile updated successfully",
            user,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});
exports.saveQuiz = saveQuiz;
