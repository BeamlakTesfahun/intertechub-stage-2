import { check, validationResult } from "express-validator";

// common validation rule for registration and login
const commonValidation = [
  check("username").notEmpty().withMessage("Username is required"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage(
      "Passwords must contain at least 1 digit, 1 special character, 1 letter, and must have a minimum length of 8 characters"
    ),
];

// validation for registration
const registerSpecificValidation = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

// for registration
export const validateRegister = [
  ...commonValidation,
  ...registerSpecificValidation,
];
// login validation
export const validateLogin = [...commonValidation];

// middleware to handle validation result errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
