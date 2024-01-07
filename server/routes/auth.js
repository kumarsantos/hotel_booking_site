import express from "express";
import { loginUser } from "../controllers/auth.js";
import { registerUser } from "../controllers/user.js";


const router = express.Router();


//login user
router.post("/login", loginUser);
// register user
router.post("/register", registerUser);

export default router;
