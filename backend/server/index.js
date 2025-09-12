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
app.use('/posts',postRoutes)
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

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if(!user) return res.status(404).json({message:"username doest exist"})
            const isUser = await bcrypt.compare(password,user.password);
    
            if(isUser) {
                return  res.status(200).json({ message: "login successful", user: user })
        }
    
        else {
            res.status(401).json({ message: "invalid credentials!" })
        }

    } catch (err) {
        res.status(400).json({ error: "user not found" })
    }
})
app.post("/comment",async(req,res)=>{
    const {id,comment,username} = req.body;
    try{

        const post = await  Post.findById(id);
        post.comments.push({username,comment})
    await post.save()
    res.json({post})
    }catch(err){
          res.status(500).json({ error: err.message });
    }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`)
})