import express from 'express';
import config  from '#config/config.js';

const app = express();

const {PORT} = config;

app.get('/',(req,res)=>{
    res.send("API is running...");
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})