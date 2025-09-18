const express =  require("express")
const app = express();
const Post  = require('../models/Post')

exports.createPost  =  async(req,res)=>{
     const {post,username} =  req.body
    try{
     if(username === '' && null) return res.json({message:"login first!"});
        const newPost = new Post({post,author:username})
        const savedPost = await newPost.save()
        res.status(201).json({savedPost})

    }catch(err){
        console.error(err);
        res.status(500).json({
      success: false,
      message: "Failed to create post"
    })
}}




exports.likePost =  async (req,res)=>{
    try{
        const {id,username} = req.body;
        const post = await Post.findById(id);
        if(!post) return res.status(404).json({message:'post not found'});
         if(post.likes.includes(username)){
            post.likes  =  post.likes.filter(u => u !==username);
        }
        else{
            post.likes.push(username);
        }
        await post.save();
        res.status(200).json({message:"like toggled",post})
    }catch(err){
res.status(500).json({message:"faield to like",err})
    }
}

exports.getPost = async(req,res)=>{
    try{
      const data = await Post.find();
      res.send(data)
    }
    catch(err){
        res.send(err)
    }
}

exports.deletePost =  async(req,res)=>{

    try{
    const {id} =  req.params;
    const {username} =  req.body;
    const post = await Post.findById(id);
    if(!post) return res.status(404).json({message: 'Post not found'});

    if(post.author !== username && username !=='admin' ) {
      return res.status(403).json({message: 'You can only delete your own posts'});
    }
    const deleted = await Post.findOneAndDelete({_id:id})
    res.status(200).json({message:'user deleted successfuly',deleted})
    }catch(err){
        res.status(403).json({message:'failed to delete post',err})
    }
}

exports.createComment  = async(req,res)=>{
    try{
        const {id} = req.params;
        const {text,username}= req.body;
        console.log(username)
        if(!username || !username.trim() ) return res.status(400).json({message:'please login first'})
        const post = await Post.findById(id);
        if(!post) return  res.status(404).json({ message: "Post not found" });

        // push new comment
        post.comments.push({username,text});
        await post.save();
        res.status(200).json({ message: "Comment added", post });

    }catch(err){
        res.status(500).json({ message: "Failed to add comment", err });
    }
}