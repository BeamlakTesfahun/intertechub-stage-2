import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 255 },
    author: { type: String, required: true, trim: true, maxlength: 255 },
    isbn: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 13,
    },
    publicationYear: { type: Number, required: true },
    favorite: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references the user model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", BookSchema);
