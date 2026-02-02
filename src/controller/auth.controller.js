import User from "../model/user.model.js";
import generateToken from "../middleware/generateToken.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status: "error",
        message: "User already exists",
      });
    }

    const user = await User.create({ name, email, password });

    generateToken(res, user, "Registration successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email }).select("+password");
    
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    generateToken(res, user, "Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};


export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

