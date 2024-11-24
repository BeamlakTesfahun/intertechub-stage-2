import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const validateBook = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  check("author")
    .notEmpty()
    .withMessage("Author is required")
    .isString()
    .withMessage("Author must be a string"),
  check("isbn")
    .notEmpty()
    .withMessage("ISBN is required")
    .isString()
    .withMessage("Isbn must be a string"),
  check("publicationYear")
    .notEmpty()
    .withMessage("Publication year is required")
    .isNumeric()
    .withMessage("Publication year must be a number"),
];

// middleware to handle validation result errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};
