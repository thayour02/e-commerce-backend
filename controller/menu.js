const mongoose = require('mongoose')
require('../db/database')
const Menu = require("../model/menus.js")

const allMenu = async(req,res)=>{
    try {
        const menus = await Menu.find().sort({createdAt: -1});
        return res.status(200).json({
            success:true,
            menus
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const addMenu = async(req,res)=>{
    try {
        const {
            name,price,recipe,image,category
        }=req.body

        const addMenu = new Menu({
            name,price,recipe,image,category
        })
         await addMenu.save();

        return res.status(200).json({
            success:true,
            addMenu
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const updateMenu = async(req,res)=>{
    const {id} = req.params
    const {name,recipe,price,image,category}= req.body
    try {
        const updatedMenu = {name,recipe,price,image,category}

        const edit = await Menu.findByIdAndUpdate({ _id:id }, updatedMenu, {new:true, runValidators:true})
        return res.status(200).json({
            success:true,
            message:"Item Updated Sucessfully",
            edit
        })
    } catch (error) {
        
    }
}

const getMenuById = async(req,res)=>{
    const  menuId  = req.params.id
    console.log(menuId)
    try {
        const menu = await Menu.findById(menuId)
        console.log(menu)
        if(!menu){
            return res.status(404).send({message:'item not found'})
        }
        return res.status(202).json({
            success:true,
            menu
        })
    } catch (error) {
        return error
    }
}

const deleteMenu = async (req,res)=>{
    const {id} = req.params
    try {
        const dele = await Menu.findByIdAndDelete({_id:id})
        if(!dele){
            return res.status(404).send({message:"Menu Not Found"})
        }
       return res.status(200).json({message:"Menu Item deleted successfully", success:true})
    } catch (error) {
        return error   
    }
}

module.exports = {addMenu,allMenu,deleteMenu, getMenuById,updateMenu }










// async function InsertMenuData() {
//     try {
//         await Menu.insertMany([
//             {
//                 "name": "Fatoush Salad",
//                 "recipe": "fresh tuna steak(served medium rare) on clChargrilledassic Nicoise salad with French beans.",
//                 "image": "http://forkify-api.herokuapp.com/images/Fatoush6380.jpg",
//                 "category": "salad",
//                 "price": 14.7
//             },
//             {
//                 "name": "Salade Lyonnaise",
//                 "recipe": "fresh tuna steak(served medium rare) on clChargrilledassic Nicoise salad with French beans.",
//                 "image": "http://forkify-api.herokuapp.com/images/saladelyonnaise640x3601288x162f0b5.jpg",
//                 "category": "salad",
//                 "price": 14.7
//             },
//             {
//                 "name": "Tortellini Salad",
//                 "recipe": "fresh tuna steak(served medium rare) on clChargrilledassic Nicoise salad with French beans.",
//                 "image": "http://forkify-api.herokuapp.com/images/tortellinisalad2811f.jpg",
//                 "category": "salad",
//                 "price": 14.7
//             },
//             {
//                 "name": "Sushi Salad",
//                 "recipe": "fresh tuna steak(served medium rare) on clChargrilledassic Nicoise salad with French beans.",
//                 "image": "http://forkify-api.herokuapp.com/images/sushisalade90f.jpg",
//                 "category": "salad",
//                 "price": 12.5
//             },
//             {
//                 "name": "Macaroni Salad",
//                 "recipe": "fresh tuna steak(served medium rare) on clChargrilledassic Nicoise salad with French beans.",
//                 "image":"http://forkify-api.herokuapp.com/images/macaroni_salad_recipeeef3.jpg",
//                 "category": "salad",
//                 "price": 12.5
//             },
//             {
//                 "name": "Tortilla Salad",
//                 "recipe": "fresh tuna steak(served medium rare) on clChargrilledassic Nicoise salad with French beans.",
//                 "image":"http://forkify-api.herokuapp.com/images/tortilla_salad_recipeddda.jpg",
//                 "category": "salad",
//                 "price": 12.5
//             },
//             {
//                 "name": "Cauliflower Pizza Crust (with BBQ Chicken Pizza)",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg",
//                 "category": "pizza",
//                 "price": 15.5
//             },
//             {
//                 "name": "Homemade Pizza",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/howtogrillpizzad300x20086a60e1b.jpg",
//                 "category": "pizza",
//                 "price": 12.5
//             },
//             {
//                 "name": "Homemade Pizza",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/howtogrillpizzad300x20086a60e1b.jpg",
//                 "category": "pizza",
//                 "price": 12.5
//             },
//             {
//                 "name": "Pizza Dip",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/pizza292x2007a259a79.jpg",
//                 "category": "pizza",
//                 "price": 12.5
//             },
//             {
//                 "name": "Greek Pizza",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/Pizza2BDip2B12B500c4c0a26c.jpg",
//                 "category": "pizza",
//                 "price": 12.5
//             },
//             {
//                 "name": "Miso Soup",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/miso_soup_recipe198a.jpg",
//                 "category": "soups",
//                 "price": 14.5
//             },
//             {
//                 "name": "Cauliflower Soup",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/cauliflowersoupb21e.jpg",
//                 "category": "soups",
//                 "price": 19.5
//             },
//             {
//                 "name": "Chicken Soup",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/chickensoupef59.jpg",
//                 "category": "soups",
//                 "price": 11.5
//             },
//             {
//                 "name":"Pumpkin Soup",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/punkin3f44.jpg",
//                 "category": "soups",
//                 "price": 18.5
//             },
//             {
//                 "name":"Strawberry Angel Food Dessert",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/189466e93.jpg",
//                 "category": "desserts",
//                 "price": 18.5
//             },
//             {
//                 "name":"Orangesicle Mousse Dessert",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/RecipeImagec5e1.jpg",
//                 "category": "desserts",
//                 "price": 15.5
//             },
//             {
//                 "name":"Red Wine Caramel Apples",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/3554695302.jpg",
//                 "category": "drinks",
//                 "price": 15.5
//             },
//             {
//                 "name":"Pasta with Whiskey, Wine, and Mushrooms",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/TPW_8234ca2c.jpg",
//                 "category": "drinks",
//                 "price": 13.5
//             },
//             {
//                 "name": "Pork Chops with Wine and Garlic",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/pork045e.jpg",
//                 "category": "drinks",
//                 "price": 12.5
//             },
//             {
//                 "name":"Red Wine-Braised Short Ribs",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/Red_Wine_Braised_Short_Ribs_646a119.jpg",
//                 "category": "popular",
//                 "price": 15.5
//             },
//             {
//                 "name":"Red Wine-Braised Short Ribs",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/Red_Wine_Braised_Short_Ribs_646a119.jpg",
//                 "category": "popular",
//                 "price": 15.5
//             },
//             {
//                 "name":"Red Wine-Braised Short Ribs",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/Red_Wine_Braised_Short_Ribs_646a119.jpg",
//                 "category": "popular",
//                 "price": 15.5
//             },
//             {
//                 "name":"Red Wine-Braised Short Ribs",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/Red_Wine_Braised_Short_Ribs_646a119.jpg",
//                 "category": "popular",
//                 "price": 15.5
//             },
//             {
//                 "name":"Pasta with Whiskey, Wine, and Mushrooms",
//                 "recipe": "Standard toppings of tomato sauce herbs cheese and maybe some thinly sliced onions tomatoes mushrooms or pepperoni",
//                 "image":"http://forkify-api.herokuapp.com/images/TPW_8234ca2c.jpg",
//                 "category": "popular",
//                 "price": 13.5
//             }
//         ])
//     } catch (error) {
//         console.log(error)
//     }
// }

// InsertMenuData()