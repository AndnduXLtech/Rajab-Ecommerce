import jwt from "jsonwebtoken";

// Generate Token Function
export const generateToken = (res, userId, userrole) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export const generateRefreshToken = (id) => {
  const refreshTokenExpire = "7d";

  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: refreshTokenExpire,
  });
};
