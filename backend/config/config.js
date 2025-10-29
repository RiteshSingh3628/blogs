import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT : process.env.PORT,
    DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUD_KEY:process.env.CLOUD_API_KEY,
    CLOUD_SECRET:process.env.CLOUD_SECRET,

}
export default config;