import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT : process.env.PORT,
    DB_URI: process.env.DB_URI,
    REMOTE_DB_URI:process.env.MONGODB_REMOTE,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUD_KEY: process.env.CLOUD_API_KEY,
    CLOUD_SECRET:process.env.CLOUD_SECRET,
    CLOUD_NAME:process.env.CLOUD_NAME
}
export default config;