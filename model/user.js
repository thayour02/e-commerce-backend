const mongoose = require('mongoose')
// const JWT = require('jsonwebtoken')
const Schema = require('mongoose')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    cart:{type:Schema.Types.ObjectId,ref:'Cart', require:true},
    name:{
        type:String
    },
    email:{
        type:String,
        trim:true,
        minlength:3
    },
    photoURL:{String},
    role:{
        type:String,
        enum:["user", "admin"],
        default:'user'
    },
    password:{
        type:String
    }
},{timestamps:true}
)


// userSchema.methods.createJWT = async function(userId){
//     const token = JWT.sign(
//         {userId:this._id},
//          process.env.JWT_SECRET_KEY,{
//             expiresIn:'7d'
//         });
//         return token
// }

module.exports = mongoose.model('User', userSchema)