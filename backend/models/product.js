const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Ownership
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    // Vendor-side identifier (from Shopify / WooCommerce)
    externalId: {
      type: String,
      required: true,
    },

    // Core product identity
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
    },

    // Product page on vendor website
    productUrl: {
      type: String,
      required: true,
    },

    // Images
    images: [
      {
        url: { type: String, required: true },
        isPrimary: { type: Boolean, default: false },
      },
    ],

    // Categorization
    category: {
      type: String,
      index: true,
    },

    subCategory: {
      type: String,
    },

    // Attributes (flexible for fashion/lifestyle)
    attributes: {
      color: String,
      material: String,
      size: [String],
      gender: String,
      style: String,
    },

    // Search helpers
    tags: [
      {
        type: String,
        index: true,
      },
    ],

    // Image search / vector search
    imageEmbedding: {
      type: [Number], // stored vector
      select: false,  // never fetch by default
    },

    embeddingVersion: {
      type: String,
    },

    // Moderation & lifecycle
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "BLOCKED"],
      default: "ACTIVE",
      index: true,
    },

    // Metrics
    totalClicks: {
      type: Number,
      default: 0,
    },

    // Soft delete
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/// --------------------
/// Indexes
/// --------------------
productSchema.index({
  title: "text",
  description: "text",
  tags: "text",
});

productSchema.index(
  { company: 1, externalId: 1 },
  { unique: true } // prevents duplicate imports
);

/// --------------------
/// Helpers
/// --------------------
productSchema.methods.toPublicObject = function () {
  const obj = this.toObject();
  delete obj.imageEmbedding;
  return obj;
};

module.exports = mongoose.model("Product", productSchema);
