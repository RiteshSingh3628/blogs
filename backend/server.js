import express from 'express';
import config  from '#config/config.js';
import connectDB from '#config/dbConfig.js';
import mongoose from 'mongoose';
import api from '#routes/api.js';
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use('/api',api);


const {PORT} = config;

app.get('/',(req,res)=>{
    res.send("API is running...");
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

const db = await connectDB();

// graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Gracefully shutting down...");

  // Close MongoDB connection
  await mongoose.disconnect();
  console.log('🗃️ MongoDB connection closed.');



  // Stop the server
  app.close(() => {
    console.log("🔒 Server closed.");
    process.exit(0); // exit with success
  });
});
