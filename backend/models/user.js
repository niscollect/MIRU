const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Basic identity
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // never return password by default
    },

    // Role in the system
    role: {
      type: String,
      enum: ["SELLER", "ADMIN"],
      default: "SELLER",
    },

    // Companies this user manages
    companies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
    ],

    // Account status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Security / auth helpers
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


/// Password Handling(Critical hai thoda dhyan se dekhna)



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};



/// safe response helper

userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);