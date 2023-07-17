const mongoose = require("mongoose")
const User = require("../Models/auth")


const getAllUsers = async(req,res)=>{
    try {
        const allUsers = await User.find();
        const allUserDetails = []
        allUsers.forEach(users=>{
            allUserDetails.push({_id: users._id, name: users.name, about:users.about, tags: users.tags, joinedOn: users.joinedOn})
        })
        console.log(allUserDetails)
        res.status(200).json(allUserDetails)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const updateProfile = async(req,res)=>{
   const {id:_id} = req.params;
   const {name,about,tags} = req.body;

   if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send("question unAvailable...")
}
try {
    const updatedProfile = await User.findByIdAndUpdate(_id, {$set: {'name': name, 'about': about, 'tags': tags}},{new:true})
    res.status(200).json(updatedProfile)
} catch (error) {
    res.status(405).json({message: error.message})
}
}

module.exports ={
    getAllUsers,
    updateProfile
}