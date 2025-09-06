const mongoose =  require('mongoose')

const signupSchema =  new mongoose.Schema({
    name:String,
    username:String,
    password:String,
})


module.exports =  mongoose.model('users',signupSchema)



