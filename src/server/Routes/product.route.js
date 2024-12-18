import { productController } from "../controllers/Admin/product.controller.js";
import express from "express";

const productRouter = express.Router();

productRouter.route("/addp").post(productController.addProduct);
productRouter.route("/edd/:id").put(productController.updateProduct);
productRouter.route("/product").get(productController.getAllProducts);
productRouter.route("/product/:id").get(productController.getProductById);
productRouter.route("/dl/:id").delete(productController.deleteProduct);

export default productRouter;
