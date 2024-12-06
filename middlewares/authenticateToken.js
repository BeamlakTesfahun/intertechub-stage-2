import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { userId, username, role } = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = {
      userId,
      username,
      role,
    };

    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Token is not valid" });
  }
};

export default authenticateToken;
