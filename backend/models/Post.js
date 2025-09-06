const mongoose = require('mongoose');


const postSchema =  new mongoose.Schema({
    post:String,
    author:String,
    createdAt: { type: Date, default: Date.now },
    likes:{type:[String],default:[]},
    comments:[{username:String,text:String,createdAt:{type:Date,default:Date.now}}],

})

module.exports  = new mongoose.model('posts',postSchema);