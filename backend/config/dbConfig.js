import mongoose from "mongoose";
import config from "#config/config.js";

const connectDB = async () => {
  console.time("⏱️ Database connection time");

  try {
    await mongoose.connect(config.REMOTE_DB_URI);
    console.log("✅ Database connected successfully:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);

    setTimeout(connectDB, 5000);
  } finally {
    console.timeEnd("⏱️ Database connection time");
  }
};


mongoose.connection.on("connected", () => {
  console.log("🗃️ MongoDB connection established");
});

mongoose.connection.on("error", (error) => {
  console.error("⚠️ MongoDB connection error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("🔌 MongoDB disconnected");
});

export default connectDB;
