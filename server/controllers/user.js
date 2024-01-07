import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};



export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};


export const getAllUsers = async (req, res, next) => {
  try {
    const updatedUser = await User.find();
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};


export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

