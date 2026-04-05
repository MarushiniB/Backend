"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const quizRoutes_1 = __importDefault(require("./routes/quizRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const collegeRoutes_1 = __importDefault(require("./routes/collegeRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/quiz", quizRoutes_1.default);
app.use("/api/courses", courseRoutes_1.default);
app.use("/api/colleges", collegeRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.get("/", (_, res) => {
    res.send("API Running...");
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});
