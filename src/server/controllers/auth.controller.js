import User from "../Models/userModels.js";
import asyncHandler from "../Middlewares/asynchandlers.js";
import { generateToken, generateRefreshToken } from "../ultls/createToken.js";
import bcrypt from "bcrypt";
import { ApiError } from "../ultls/apierror.js";

export class authController {
  static register = asyncHandler(async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new ApiError(400, "User already exists");
      }

      const user = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        user: {
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  });

  static loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "No user found with this email",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password does not match",
      });
    }
    const token = generateToken(res, existingUser._id, existingUser.role);
    const refreshToken = generateRefreshToken(existingUser._id);

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.status(200).json({
      token,
      role: existingUser.role,
      success: true,
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  });

  static logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
}

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ApiError(401, "Refresh token not provided");
    }

    const decoded = jwt.verify(refreshToken, config.refreshTokenSecret);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const newToken = generateToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      success: true,
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};
