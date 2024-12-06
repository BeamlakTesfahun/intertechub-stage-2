import express from "express";
import {
  addBook,
  getBooks,
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
import authenticateToken from "../middlewares/authenticateToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();

router.post(
  "/",
  validateBook,
  handleValidationErrors,
  authenticateToken,
  authorizeRole(["user"]),
  addBook
);
router.get("/all", authenticateToken, authorizeRole(["admin"]), getAllBooks);
router.get("/", authenticateToken, getBooks);
router.get("/recommendations", authenticateToken, recommendBook);
router.put("/favorite/:id", authenticateToken, favoriteBook);
router.put("/:id", authenticateToken, authorizeRole(["admin"]), updateBook);
router.delete("/:id", authenticateToken, authorizeRole(["admin"]), deleteBook);

export default router;
