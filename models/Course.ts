import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  category: string;
  name: string;
  description: string;
}

const CourseSchema = new Schema({
  category: String,
  name: String,
  description: String,
});

export default mongoose.model<ICourse>("Course", CourseSchema);