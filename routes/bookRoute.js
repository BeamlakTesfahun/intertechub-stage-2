import express from "express";
import {
  addBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
  recommendBook,
  favoriteBook,
} from "../controllers/bookController.js";
import {
  validateBook,
  handleValidationErrors,
} from "../middlewares/bookValidator.js";

const router = express.Router();

router.post("/", validateBook, handleValidationErrors, addBook);
router.get("/", getAllBooks);
router.get("/recommendations", recommendBook);
router.put("/favorite/:id", favoriteBook);
router.get("/:id", getBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
