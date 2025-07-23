import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// This is middleware which is helpful to logout user

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // Grab token from cookies or from Authorization
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // Verify token is there or not
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Decode Token

    const decodedTokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedTokenInfo?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      // TODO: discuss about frontend
      throw new ApiError(401, "Invalid Aceess Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
