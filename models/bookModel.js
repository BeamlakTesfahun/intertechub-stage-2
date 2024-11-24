import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publishedYear: { type: Number, required: true },
    favorite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", BookSchema);
