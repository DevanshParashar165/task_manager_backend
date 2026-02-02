import express from "express";
import { registerUser, loginUser, logoutUser, getMe} from "../controller/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/logout", protect, logoutUser);
userRoute.get("/me", protect, getMe);

export default userRoute;
