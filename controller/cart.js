
const mongoose = require('mongoose')
require('../db/database')
const Cart = require("../model/cart")
const User = require('../model/user')

const addToCart = async (req, res) => {
    try {
        const { menuItemId, name, recipe, image, quantity, email, price } = req.body

        const alreadyCart = await Cart.findOne({ menuItemId, email })
        if (alreadyCart) {
            return res.status(403).json({
                success: false,
                message: "item already in cart"
            })
        }
        const cart = await Cart.create({ menuItemId, name, recipe, image, quantity, email, price })
        //updateuser
        const users = await User.findOneAndUpdate({ email }, {
            $push: {
                cart: cart._id
            }
        }, { new: true }).populate("cart")

        return res.status(200).json({
            success: true,
            cart,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getCartByEmail = async (req, res) => {
    const email = req.query.email
    try {
        const carts = await Cart.find({ email: email }).exec()
        if (!carts) {
            return res.status(404).json({
                success: false,
                message: "account not found"
            })
        } else {
            return res.status(200).json({
                success: true,
                data: carts
            })
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteCart = async (req, res) => {
    const id = req.params.id
    const email = req.query.email

    try {
        const cart = await Cart.findByIdAndDelete(id)
        if (!cart) {
            return res.status(404).send({ message: "vcart not found" })
        }

        const user = await User.findOneAndUpdate({ email },
            { $pull: { cart: cart._id } },
            { new: true })


        return res.status(200).json({
            success: true,
            message: "items deleted succefully"
        })
    } catch (error) {
        console.log(error.message)
    }
}

const getCartById = async (req, res) => {
    const id = req.params.id
    try {
        const menu = await Cart.findById({ _id: id })
        if (!menu) {
            return res.status(404).json({ message: "menu not found" })
        } else {
            return res.status(200).json({
                data: menu
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

const updateCartQuantity = async (req, res) => {
    try {
        const cartId = req.params.id
        const { menuItemId, name, recipe, image, quantity, email, price } = req.body
        const result = await Cart.findByIdAndUpdate(cartId,
            { menuItemId, name, recipe, image, quantity, email, price },
            { new: true, runValidator: true }
        )
        if (result)
            return res.status(200).json({
                success: true,
                message: "cart updated successfully"
            })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { addToCart, getCartByEmail, deleteCart, getCartById, updateCartQuantity }