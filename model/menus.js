
const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        required: true
    },
    recipe: { type: String, require },
    category: {
        type: String,
        enum: ["desserts", "drinks", "soups", "pizza", "salad", 'popular'],
    },
    image:  String,
    price: Number,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

module.exports = mongoose.model('Menu', menuSchema)