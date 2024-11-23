import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnection.js";

// load env variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// db connection
connectDB();

// create express app
const app = express();

// cors
app.use(cors());

// for parsing json bodies
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
