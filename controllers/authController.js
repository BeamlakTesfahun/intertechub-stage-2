import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      address,
      dateOfBirth,
      role,
    } = req.body;

    // check for existing email or username
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Username already in use" });
    }

    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password,
      address,
      dateOfBirth,
      role,
    });

    await createdUser.save();

    res.status(StatusCodes.CREATED).json({
      msg: "User created successfully",
      user: {
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        username: createdUser.username,
        address: createdUser.address,
        dateOfBirth: createdUser.dateOfBirth,
        role: createdUser.role,
      },
    });
  } catch (error) {
    console.log("Error occurred while signing up user");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const findUser = await User.findOne({ username });

    if (!findUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Username not found",
      });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);

    // check if password matches
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Incorrect password",
      });
    }

    // create token
    const token = jwt.sign(
      {
        userId: findUser._id,
        username: findUser.username,
        role: findUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(StatusCodes.OK).json({
      msg: "Login successful",
      token,
      user: {
        username: findUser.username,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email: findUser.email,
        address: findUser.address,
        dateOfBirth: findUser.dateOfBirth,
        role: findUser.role,
      },
    });
  } catch (error) {
    console.log("Error occurred while logging in user", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};
export { createUser, login };
