import User from "../Models/userModels.js";
import asyncHandler from "../Middlewares/asynchandlers.js";
import bcrypt from "bcrypt";
import Address from "../Models/address.model.js";
import OrderHistory from "../Models/orderhisotry.model.js";

import Cart from "../Models/Cart.model.js";
import Wishlist from "../Models/wishlist.model.js";

export class userController {
  static getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
      message: "user data",
      userData: users,
      status: "success",
    });
  });

  static getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
        success: false,
      });
    }

    const wishlist = await Wishlist.findOne({ user: req.user._id });
    const cart = await Cart.findOne({ user: req.user._id });

    const wishlistLength = wishlist ? wishlist.products.length : 0;
    const cartLength = cart ? cart.products.length : 0;

    res.status(200).json({
      user,
      wishlistLength,
      cartLength,
      success: true,
      message: "Successfully retrieved user data",
    });
  });

  static updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        message: "No user found",
        success: false,
      });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password && req.body.oldPassword) {
      const isPasswordMatch = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );

      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Old password is incorrect",
          success: false,
        });
      }

      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      message: "Successfully updated user profile",
      success: true,
      updatedUser,
    });
  });

  static deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        message: "No user found on this ID",
        success: false,
      });
    }

    if (user.isAdmin) {
      res.status(401);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.status(200).json({
      message: "User removed",
      success: true,
    });
  });

  static getAuserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "No user found on this ID",
        success: false,
      });
    }

    res.status(200).json({
      user,
      success: true,
    });
  });

  static updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        message: "No user found on this ID",
        success: false,
      });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      message: "User profile successfully updated",
      success: true,
      updatedUser,
    });
  });

  static getUserOrderHistory = asyncHandler(async (req, res) => {
    const orderHistory = await OrderHistory.findById(req.user._id);
    res.status(200).json({
      orderHistory,
      success: true,
    });
  });

  static getUserAddress = asyncHandler(async (req, res) => {
    const addresses = await Address.find({ user: req.user._id });

    if (!addresses) {
      return res.status(404).json({
        success: false,
        message: "No addresses found for this user",
      });
    }

    res.status(200).json({
      success: true,
      addresses,
    });
  });

  static addAddress = asyncHandler(async (req, res) => {
    const { street, city, state, zipCode, phone, isPrimary } = req.body;

    // Validate input
    if (!street || !city || !state || !zipCode) {
      return res.status(400).json({
        message: "Street, city, state, and zipCode are required",
        success: false,
      });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Create address object with optional phone
    const addressData = {
      user: userId,
      street,
      city,
      state,
      zipCode,
      isPrimary: isPrimary || false,
    };

    if (phone) {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          message: "Invalid phone number format",
          success: false,
        });
      }
      addressData.phone = phone;
    }

    const newAddress = new Address(addressData);

    console.log("New Address to be saved:", newAddress);

    await newAddress.save();

    user.addresses.push(newAddress._id);
    await user.save();

    res.status(201).json({
      message: "Address added successfully",
      address: newAddress,
      success: true,
    });
  });

  static removeAddress = asyncHandler(async (req, res) => {
    const addressId = req.params.id;
    const userId = req.user._id;

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
      });
    }

    if (address.user.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized to remove this address",
        success: false,
      });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { addresses: addressId },
    });

    await address.deleteOne();

    res.status(200).json({
      message: "Address removed successfully",
      success: true,
    });
  });

  static updateAddress = asyncHandler(async (req, res) => {
    const addressId = req.params.id;
    const userId = req.user._id;
    const { street, city, state, country, zipCode, phone, isPrimary } =
      req.body;

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
      });
    }

    if (address.user.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this address",
        success: false,
      });
    }

    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.country = country || address.country;
    address.zipCode = zipCode || address.zipCode;
    address.phone = phone || address.phone;

    if (isPrimary) {
      await Address.updateMany(
        { user: userId, isPrimary: true },
        { isPrimary: false }
      );
      address.isPrimary = true;
    } else if (isPrimary === false) {
      address.isPrimary = false;
    }

    await address.save();

    res.status(200).json({
      message: "Address updated successfully",
      address,
      success: true,
    });
  });
}
