import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelById,
  getHotelRooms,
  updatedHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE HOTEL
router.post("/", verifyAdmin, createHotel);

//UPDATE HOTEL
router.put("/:id", verifyAdmin, updatedHotel);

//DELETE HOTEL
router.delete("/:id", verifyAdmin, deleteHotel);

//GET ALL HOTELS
router.get("/", getAllHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

//GET HOTEL BY ID

router.get("/:id", getHotelById);
router.get("/room/:id", getHotelRooms);

export default router;
