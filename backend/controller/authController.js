const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require("jsonwebtoken")
exports.signup =  async (req, res) => {
    
    const { name, username, password } = req.body;
    console.log(name,username,password)
    console.log('signup route hit')
    try {
const userExist =await  User.findOne({username});
   if(userExist) return res.status(400).json({ message: "Username already taken" });
        const hashed =  await bcrypt.hash(password,10);
        const newUser = new User({ name, username, password:hashed});
        await newUser.save()
        console.log('User saved successfully!', newUser);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error(err)
    }
}


exports.login = async(req,res)=>{
    const {username,password} =  req.body;
    try{
        const doesUserExist = await  User.findOne({username});
        if(!doesUserExist) return res.status(404).json({message:'user does not exist!'});

        const token = jwt.sign( {
        id: doesUserExist._id,
        username: doesUserExist.username,   // ye add karna zaroori hai
        isAdmin: doesUserExist.isAdmin
      },  process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )
      const varifyPassword = await  bcrypt.compare(password,doesUserExist.password);
      if(varifyPassword) return res.status(200).json({token,user:doesUserExist})

 else {
            res.status(401).json({ message: "invalid credentials!" })
        } 
    }catch(err){
        res.status(400).json({message:'login failed!',err})
    }
}