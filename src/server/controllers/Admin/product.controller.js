import asyncHandler from "../../Middlewares/asynchandlers.js";
import ProductVariant from "../../Models/product.varient.model.js";
import Product from "../../Models/proudctModel.js";
import mongoose from "mongoose";

export class productController {
  static addProduct = asyncHandler(async (req, res) => {
    try {
      // Destructure fields from request body
      const {
        name,
        description,
        brand,
        category,
        price,
        discount = 0,
        images = [],
        variants = [],
        stock,
        sku,
        specifications = [],
        shipping = {},
      } = req.body;

      // Check for missing required fields
      if (
        !name ||
        !description ||
        !brand ||
        !category ||
        !price ||
        !stock ||
        !sku
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      // Check if product already exists based on SKU
      const existingProduct = await Product.findOne({ sku });
      if (existingProduct) {
        return res.status(409).json({
          success: false,
          message: "A product with this SKU already exists",
        });
      }

      // Create new product without variants
      const newProduct = new Product({
        name,
        description,
        brand,
        category,
        price,
        discount,
        images,
        stock,
        sku,
        specifications,
        shipping,
        ratings: {
          average: 0,
          count: 0,
        },
      });

      // Save new product to the database
      const savedProduct = await newProduct.save();

      // Create and save variants
      const variantIds = [];
      for (const variant of variants) {
        const newVariant = new ProductVariant({
          ...variant,
          product: savedProduct._id,
        });
        const savedVariant = await newVariant.save();
        variantIds.push(savedVariant._id);
      }

      // Update product with variant references
      savedProduct.variants = variantIds;
      await savedProduct.save();

      // Send success response
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: savedProduct,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add product",
        error: error.message,
      });
    }
  });

  static updateProduct = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const updateData = req.body;
      const { variants, ...productData } = updateData;

      delete productData._id;
      delete productData.createdAt;
      productData.updatedAt = Date.now();

      if (productData.sku) {
        const existingProductWithSku = await Product.findOne({
          sku: productData.sku,
          _id: { $ne: id },
        });

        if (existingProductWithSku) {
          return res.status(409).json({
            success: false,
            message: "SKU must be unique",
          });
        }
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Handle variant updates
      if (variants && Array.isArray(variants)) {
        for (const variant of variants) {
          if (variant._id) {
            // Update existing variant
            await ProductVariant.findByIdAndUpdate(variant._id, variant, {
              new: true,
              runValidators: true,
            });
          } else {
            // Create new variant
            const newVariant = new ProductVariant({
              ...variant,
              product: updatedProduct._id,
            });
            await newVariant.save();
            updatedProduct.variants.push(newVariant._id);
          }
        }
        await updatedProduct.save();
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update product",
        error: error.message,
      });
    }
  });

  static deleteProduct = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      // Find and delete the product
      const deletedProduct = await Product.findByIdAndDelete(id);

      // Check if product exists
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete product",
        error: error.message,
      });
    }
  });

  static getProductById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      // Validate the ID
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const product = await Product.findById(id).populate("variants");

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
        error: error.message,
      });
    }
  });

  static getAllProducts = asyncHandler(async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        minPrice,
        maxPrice,
        brand,
      } = req.query;

      const filter = {};
      if (category) filter.category = category;
      if (brand) filter.brand = brand;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
      };

      const products = await Product.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalProducts = await Product.countDocuments(filter);

      res.status(200).json({
        success: true,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  });
}
