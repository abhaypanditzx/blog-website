const express = require('express');
const cors = require('cors');
const User = require('../models/User')
const Post  = require('../models/Post')
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const app = express();
app.use(cors())
app.use(express.json())
const postRoutes = require("../Routes/postRoutes")
const authRoutes =  require("../Routes/authRoutes")
app.use('/posts',postRoutes)
app.use('/auth',authRoutes);
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('mongodb connnection successful');
}).catch((err) => {
    console.error("mongodb connection failed", err)
})
app.get('/users',async(req,res)=>{
    try{
      const data = await User.find(); 
      res.send(data)
    }
    catch(err){
        res.send(err)
    }
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`)
})