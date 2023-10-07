import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js"

import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, answer, phone, address } = req.body;
    // if(!name) {
    //     return res.send({message: "Name is Require"})
    // }
    // if(!email) {
    //     return res.send({message: "Email is Require"})
    // }
    // if(!password) {
    //     return res.send({message: "Password is Require"})
    // }
    // if(!answer) {
    //     return res.send({message: "Answer is Require"})
    // }
    // if(!address) {
    //     return res.send({message: "Address is Require"})
    // }

    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = new userModel({
      name,
      email,
      phone,
      answer,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  console.log(req.body);
  try {
    const { email, answer, newPassword } = req.body;
    //validation
    if (!email) {
      return res.send({ message: "Email is Require" });
    }
    if (!newPassword) {
      return res.send({ message: "New password is Require" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Require" });
    }
    //check user
    const user = await userModel.findOne({ email});
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    //update user
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findOneAndUpdate(
      user._id,
      { password: hashedPassword },
      {
        new: true,
      }
    );
    res.status(200).send({
      success: true,
      message: "Reset password successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Reset password",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send("protected route");
};

//update Profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const { _id } = req.user;
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id },
      { name: name, email: email, phone: phone, address: address },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating profile",
      error,
    });
  }
};

