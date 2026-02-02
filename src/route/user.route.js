import express from "express";
import { registerUser, loginUser, logoutUser} from "../controller/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/logout", protect, logoutUser);

export default userRoute;
