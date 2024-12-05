const jwt = require('jsonwebtoken')
const User = require('../model/user')


const verifyAdmin = async(req,res,req)=>{
    const email = req.decoded.email;
    const query = {email:email};
    

    const user = await User.findOne(query)

    const isAdmin = user?.role == 'admin';

    if(!isAdmin){
        return res.status(404).send({message:"forbidden access"})
    }
    next()
}

module.exports  = verifyAdmin