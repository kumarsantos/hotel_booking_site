import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//update user
router.put("/:id", verifyUser, updateUser);
//get all user
router.get("/", verifyAdmin, getAllUsers);
//get user by id
router.get("/:id", verifyUser, getUserById);
//delete user
router.delete("/:id", verifyUser, deleteUser);

export default router;
