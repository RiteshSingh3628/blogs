import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // email regex
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String, // store image URL
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin","superadmin"],
      default: "user",
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);

// hash password before saving 
userSchema.pre("save", async function (next) {
 
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); 
    next();
  } catch (err) {
    next(err);
  }
});

// method to compare password
userSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
