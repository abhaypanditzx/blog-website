const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req,res,next)=>{
    const authHeader =  req.headers.authorization || '';
    const token =  authHeader.toLowerCase().startsWith('bearer ') ?authHeader.split(' ')[1] : null;
    if(!token) {
        return res.status(401).json({message:"please login first!"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(err){
        return res.status(403).json({message:"invalid or expired token"});
    }
}