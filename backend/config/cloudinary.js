import { v2 as cloudinary } from "cloudinary";
import config from "./config.js";

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = config;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
  secure: true,
});

export default cloudinary;
