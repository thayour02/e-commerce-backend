const mongoose = require('mongoose')
const User = require("../model/user")
const bycrypt = require('bcryptjs')
const Cart = require('../model/cart')
const { json } = require('express')

const createUser =  async(req,res)=>{
    const user = req.body
    const query ={email:user.email}
    try {
       const existingUser = await User.findOne(query)
       if(existingUser){
        return res.status(302).json({message:"user alredy exist", success:false})
       }
       const users = await User.create(user)
       consoles.log(users)
    //    const token = json.sign
    // const token = jwt.sign(users,process.env.JWT_SECRET_KEY,{
    //     expiresIn:'1hr'
    //   })
       return res.status(200).json({
        success:true,
        message:"account create successfully",
        users
       })
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

const getAllUser = async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json({
            message:"users",
            success:true,
            users
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}


const deleteUser = async(req,res)=>{
    const userId = req.params.id
   
    try {
        const deleteUser = await User.findByIdAndDelete(userId)
        if(!deleteUser){
            return res.status(404).json({message:"user not exist"})
        }
//         const cart = await Cart.findOne({user})
//         console.log(cart)

        return res.status(200).json({
            message:"user deleted successfully",
            success:true
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAdmin = async(req,res)=>{
    const email = req.query.email
    const query = {email:email}
    try {
       const user = await User.find(query).exec()
       if(email !== req.decoded.email){
        return res.status(403).send({message:"forbidden access"})
       }
       let admin = false
       if(user){
        admin = user?.role === "admin"
       }
       return res.status(200).json({admin})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

const makeAdmin = async(req,res)=>{
    const userId = req.params.id
    const  {name,email,photoURL,role}= req.body

    try {
        const updatedUser = await User.findByIdAndUpdate(userId,
            {role:"admin"},{new:true, runValidators:true})
            console.log(updatedUser)
            if(!updatedUser){
                return res.status(404).json({message:"User not found"})
            }
            return res.status(202).json({
                success:true,
                message:"updated succesfully",
                updatedUser
            })
    } catch (error) {
        
    }
}
const getUserByEmail = async(req,res)=>{
    // const userId = req.params.id
    const email = req.query.email
    const query = {email:email}
    try {
        const user = await User.findOne(query)
        return res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}


module.exports = {createUser,getAllUser,getUserByEmail,getAdmin,makeAdmin,deleteUser}