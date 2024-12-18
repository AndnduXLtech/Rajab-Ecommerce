import express from "express";

import { userController } from "../controllers/user.controller.js";

import { authUser, authAdmin } from "../Middlewares/authmiddleware.js";
import { productController } from "../controllers/Admin/product.controller.js";

const userRouter = express.Router();
// product controller , this we need to move addmin side and if you want you can make commonroute where you can add get all product rout

userRouter
  .route("/profile")
  .get(authUser, userController.getCurrentUser)
  .put(authUser, userController.updateUserProfile);
userRouter
  .route("/updateAddress/:id")
  .put(authUser, userController.updateAddress);
userRouter
  .route("/removeAddress/:id")
  .delete(authUser, userController.removeAddress);
userRouter.route("/getAddress").get(authUser, userController.getUserAddress);
//xai-dNTrPvKQApfSHO1mo07ygxipyb1r4qDo0wvVCv4OdJEpBYs8ASJYnDBzq2CGewIhGAiFzG4BJLhWXTKA

//admin

userRouter.route("/addp").post(productController.addProduct);
userRouter.route("/edd/:id").put(productController.updateProduct);
userRouter.route("/product").get(productController.getAllProducts);
userRouter.route("/product/:id").get(productController.getProductById);
userRouter.route("/dl/:id").delete(productController.deleteProduct);
userRouter.route("/addAddress").post(authUser, userController.addAddress);

userRouter.route("/").get(authUser, authAdmin, userController.getAllUsers);
userRouter
  .route("/:id")
  .delete(authUser, authAdmin, userController.deleteUserById)
  .get(authUser, authAdmin, userController.getAuserById)
  .put(authUser, authAdmin, userController.updateUserById);

export default userRouter;

// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// // Optional: Add authentication middleware
// // const { authenticateUser, authorizeAdmin } = require('../middleware/auth');

// // Route to add a new product
// // Use authenticateUser and authorizeAdmin middleware if needed
// router.post('/add', productController.addProduct);

// // Route to update an existing product
// router.put('/update/:id', productController.updateProduct);

// // Route to delete a product
// router.delete('/delete/:id', productController.deleteProduct);

// // Route to get a single product by ID
// router.get('/:id', productController.getProductById);

// // Route to get all products with optional filtering
// router.get('/', productController.getAllProducts);

// module.exports = router;
