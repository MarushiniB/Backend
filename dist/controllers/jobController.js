"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobs = void 0;
const getJobs = (req, res) => {
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
exports.getJobs = getJobs;
