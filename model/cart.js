
const mongoose = require('mongoose')
const Schema = require ('mongoose')

const cartSchema = new mongoose.Schema({
    user:{type: Schema.Types.ObjectId, ref:'User'},
    name:{type:String},
     menuItemId:{type:String},
    recipe:{type:String},
    category:{
        type:String,
        enum:["desserts","drinks","soups","pizza", "salad",'popular']
    },
    image:{
        type:String
    },
    price:{
        type:Number
    },
    email:{
        type:String
    },
    quantity:{
        type:Number,
        default: 1
    }

},{timestamps:true})

module.exports = mongoose.model('Cart', cartSchema)