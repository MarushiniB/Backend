import mongoose, { Schema, Document } from "mongoose";

export interface ICollege extends Document {
  name: string;
  district: string;
  courses: string[];
  website: string;
}

const CollegeSchema = new Schema({
  name: String,
  district: String,
  courses: [String],
  website: String,
});

export default mongoose.model<ICollege>("College", CollegeSchema);