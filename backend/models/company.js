const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    // Basic brand identity
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
    },

    logoUrl: {
      type: String,
    },

    websiteUrl: {
      type: String,
      required: true,
    },

    // Ownership
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Business metadata
    industry: {
      type: String, // fashion, lifestyle, electronics, etc.
    },

    country: {
      type: String,
    },

    // Status & moderation
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"],
      default: "PENDING",
      index: true,
    },

    rejectionReason: {
      type: String,
    },

    // Metrics (for admin + vendors)
    totalProducts: {
      type: Number,
      default: 0,
    },

    totalClicks: {
      type: Number,
      default: 0,
    },

    // Soft delete (never hard delete brands)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster discovery
companySchema.index({ name: "text", description: "text" });

// Prevent sellers from modifying restricted fields
companySchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.rejectionReason;
  return obj;
};

module.exports = mongoose.model("Company", companySchema);
