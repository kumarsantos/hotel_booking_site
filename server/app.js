import express from "express";
import dotEnv from "dotenv"; //ES6 style to configure dotenv file or import 'dotenv' and envObject.config() e.g(dotenv.config())
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomRoutes from "./routes/rooms.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();

//.env file config
dotEnv.config();

///Database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("Mongodb Disconnected");
});
mongoose.connection.on("connect", () => {
  console.log("Mongodb Connected");
});
//////////////*****/////////////////

//middlewares
app.use(cookieParser());
app.use(cors());//this is use when proxy in FE not used
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);

///error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on PORT ${PORT}`);
});
