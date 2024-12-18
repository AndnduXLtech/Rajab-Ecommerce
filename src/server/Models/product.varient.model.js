import mongoose from "mongoose";

// Variant Model
const ProductVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    color: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ProductVariant = mongoose.model("ProductVariant", ProductVariantSchema);
export default ProductVariant;
