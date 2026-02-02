import jwt from "jsonwebtoken";

const generateToken = (res, user, message) => {
  const token = jwt.sign(
    { userId: user._id }, 
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  user.password = undefined;

  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message,
      user,
    });
};

export default generateToken
