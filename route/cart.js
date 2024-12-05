const express = require('express')

const router = express.Router()

const {addToCart,getCartByEmail,deleteCart,getCartById,updateCartQuantity} = require('../controller/cart')
const  userAuth  = require("../middleware/authMiddleware")
const { route } = require('./menus')

router.post('/add-to-carts', addToCart)
router.get('/carts', userAuth, getCartByEmail)
router.delete('/carts/:id', deleteCart)
router.get('/carts/:id',getCartById)
router.put('/carts/:id',updateCartQuantity)



module.exports = router