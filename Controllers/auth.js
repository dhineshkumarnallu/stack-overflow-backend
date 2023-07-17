const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const users = require("../Models/auth")


//Signup

const signup = async(req,res)=>{
  const {name,email,password} = req.body
  try {
     const existingUser = await users.findOne({email})
     if(existingUser){
        return res.status(404).json({message:"User already exists"})
     }

    const hashedPassword = await bcrypt.hash(password,12)

    const newUser = await users.create({name,email,password:hashedPassword})

    const token = jwt.sign({email:newUser.email, id:newUser._id},"test", { expiresIn: '1h'});

    res.status(200).json({result:newUser,token})

  } catch (error) {
    res.status(500).json("Something went wrong")
  }
}

//Login

const login = async(req,res)=>{
    const {email,password} = req.body
    console.log(req.body)
    try {
        const existingUser = await users.findOne({email})
        if(!existingUser){
           return res.status(404).json({message:"User don't exists"})
        }

        const isPasswordCrt = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({email:existingUser.email, id:existingUser._id},"test", { expiresIn: '1h'});

        res.status(200).json({result:existingUser,token})
        
    } catch (error) {
        res.status(500).json("Someting went wrong...")
        
    }
    
}








module.exports = {
    signup,
    login
}