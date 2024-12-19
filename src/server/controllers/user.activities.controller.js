import Wishlist from "../Models/wishlist.model.js";
import Cart from "../Models/Cart.model.js";
import OrderHistory from "../Models/orderhisotry.model.js";
import asyncHandler from "../Middlewares/asynchandlers.js";
import Product from "../Models/proudctModel.js";
import mongoose from "mongoose";
import ProductVariant from "../Models/product.varient.model.js";

export class userActivitiesController {
  static toggleWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingWishlist = await Wishlist.findOne({
      user: req.user._id,
      "products.product": productId,
    });

    if (existingWishlist) {
      // Remove product from wishlist
      await Wishlist.updateOne(
        { user: req.user._id },
        { $pull: { products: { product: productId } } }
      );

      return res.status(200).json({
        success: true,
        message: "Product removed from wishlist",
      });
    } else {
      // Add product to wishlist
      const productObject = {
        product: productId,
        addedAt: new Date(),
      };

      let wishlist = await Wishlist.findOneAndUpdate(
        { user: req.user._id },
        { $addToSet: { products: productObject } },
        { new: true, upsert: true }
      );

      wishlist = await wishlist.populate({
        path: "products.product",
        select: "name price images description",
      });

      return res.status(200).json({
        success: true,
        message: "Product added to wishlist",
        wishlist,
      });
    }
  });

  static getUserWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },

      {
        $project: {
          _id: 1,
          user: 1,
          products: {
            $map: {
              input: "$products",
              as: "wishlistItem",
              in: {
                product: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails",
                        as: "prod",
                        cond: {
                          $eq: ["$$prod._id", "$$wishlistItem.product"],
                        },
                      },
                    },
                    0,
                  ],
                },
                addedAt: "$$wishlistItem.addedAt",
              },
            },
          },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    if (!wishlist.length) {
      return res.status(200).json({
        success: true,
        message: "No wishlist found",
        wishlist: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Wishlist retrieved successfully",
      wishlist: wishlist[0],
    });
  });

  static removeFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { products: { product: productId } } },
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
      wishlist,
    });
  });

  // Add new product to cart
  static addToCart = asyncHandler(async (req, res) => {
    const { productId, variantId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const MAX_QUANTITY = 10;

    // Validate product and variant
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const variant = await ProductVariant.findById(variantId);
    if (!variant || variant.product.toString() !== productId) {
      return res.status(404).json({
        success: false,
        message: "Variant not found or does not match the product",
      });
    }

    const existingCart = await Cart.findOne({
      user: req.user._id,
      "products.product": productId,
      "products.variant": variantId,
    });

    if (existingCart) {
      const existingProduct = existingCart.products.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant.toString() === variantId
      );

      const newQuantity = existingProduct.quantity + quantity;

      if (newQuantity > MAX_QUANTITY) {
        return res.status(400).json({
          success: false,
          message: `Cannot add more than ${MAX_QUANTITY} items of this product variant`,
        });
      }

      await Cart.updateOne(
        {
          user: req.user._id,
          "products.product": productId,
          "products.variant": variantId,
        },
        {
          $set: { "products.$.quantity": newQuantity },
        }
      );

      const cart = await Cart.findOne({
        user: req.user._id,
      })
        .populate("products.product")
        .populate("products.variant");

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart,
      });
    }

    // Add new product with variant to cart
    await Cart.updateOne(
      { user: req.user._id },
      {
        $push: {
          products: {
            product: productId,
            variant: variantId,
            quantity: quantity || 1,
          },
        },
      },
      { upsert: true }
    );

    const cart = await Cart.findOne({
      user: req.user._id,
    })
      .populate("products.product")
      .populate("products.variant");

    if (cart) {
      res.status(200).json({
        success: true,
        message: "Product variant added to cart successfully",
        cart,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update or create cart",
      });
    }
  });

  static removeFromCart = asyncHandler(async (req, res) => {
    const { productId, variantId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { products: { product: productId, variant: variantId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    await cart.populate("products.product");

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      cart,
    });
  });

  static updateCartQuantity = asyncHandler(async (req, res) => {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOneAndUpdate(
      {
        user: req.user._id,
        "products.product": productId,
        "products.variant": variantId,
      },
      {
        $set: { "products.$.quantity": quantity },
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
    });
  });

  static getUserCart = asyncHandler(async (req, res) => {
    const cartAggregation = await Cart.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $lookup: {
          from: "productvariants",
          localField: "products.variant",
          foreignField: "_id",
          as: "variantDetails",
        },
      },
      {
        $unwind: "$variantDetails",
      },
      {
        $group: {
          _id: "$_id",
          products: {
            $push: {
              product: "$productDetails",
              variant: "$variantDetails",
              quantity: "$products.quantity",
            },
          },
          total: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"],
            },
          },
        },
      },
    ]);

    if (!cartAggregation.length) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: {
          products: [],
          total: 0,
        },
      });
    }

    const cart = cartAggregation[0];

    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      cart,
    });
  });

  static clearCart = asyncHandler(async (req, res) => {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { products: [] } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart: {
        products: [],
        total: 0,
      },
    });
  });
}
