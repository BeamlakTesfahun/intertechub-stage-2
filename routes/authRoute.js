import express from "express";
import { createUser, login } from "../controllers/authController.js";
import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from "../middlewares/authValidator.js";

const router = express.Router();

router.post("/signup", validateRegister, handleValidationErrors, createUser);
router.post("/login", validateLogin, handleValidationErrors, login);

export default router;
