const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    // Ownership
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    // Pricing
    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    listPrice: {
      type: Number,
      required: true, // MRP / original price
    },

    salePrice: {
      type: Number, // optional discounted price
    },

    // Price lifecycle
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    // Optional: seller notes / campaign tagging
    source: {
      type: String, // csv-import, manual, campaign, etc.
      default: "manual",
    },
  },
  {
    timestamps: true,
  }
);

/// --------------------
/// Indexes
/// --------------------

// One active price per product
priceSchema.index(
  { product: 1, isActive: 1 },
  { unique: true, partialFilterExpression: { isActive: true } }
);

/// --------------------
/// Virtuals
/// --------------------
priceSchema.virtual("effectivePrice").get(function () {
  return this.salePrice ?? this.listPrice;
});

/// --------------------
/// Helpers
/// --------------------
priceSchema.methods.toPublicObject = function () {
  const obj = this.toObject();
  obj.effectivePrice = this.salePrice ?? this.listPrice;
  return obj;
};

module.exports = mongoose.model("Price", priceSchema);
