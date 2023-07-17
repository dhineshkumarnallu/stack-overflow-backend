const Questions = require('../Models/Questions')
const mongoose = require("mongoose")


const AskQuestion = async(req,res)=>{


try {
    const postQuestion=  await new Questions(req.body)
    await postQuestion.save();
    res.status(200).json("Posted a question successfully")
    console.log("success")
} catch (error) {
    console.log(error)
    res.status(409).json("Couldn't post a new question")
}

}

const getAllQuestions = async(req,res)=>{
    try {
        const questionList = await Questions.find();
        res.status(200).json(questionList)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


const deleteQuestion = async(req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unAvailable...")
    }

try {
    await Questions.findByIdAndRemove(_id )
    res.status(200).json({message:"successfully deleted..."})
} catch (error) {
    res.status(404).json({message:error.message})
}
}

const voteQuestion =async(req,res)=>{
const{id:_id} = req.params;
const {value, userId} = req.body;

if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send("question unAvailable...")

}


try {
    const question = await Questions.findById(_id)
    const upIndex = question.upVotes.findIndex((id)=>id === String(userId))
    const downIndex = question.downVotes.findIndex((id)=>id === String(userId))
    if(value === 'upVote'){
        if(downIndex !== -1){
       question.downVotes = question.downVotes.filter((id)=> id !== String(userId))
        }
        if(upIndex === -1){
            question.upVotes.push(userId)
        }else{
            question.upVotes = question.upVotes.filter((id)=> id !==String(userId))
        }
    }
    else if(value === 'downVote'){
        if(upIndex !== -1){
       question.upVotes = question.downVotes.filter((id)=> id !== String(userId))
        }
        if(downIndex === -1){
            question.downVotes.push(userId)
        }else{
            question.downVotes = question.downVotes.filter((id)=> id !==String(userId))
        }
    }
     await Questions.findByIdAndUpdate(_id, question )  
     res.status(200).json({message:"Valid successfully..."})
} catch (error) {
    res.status(404).json({message:"id not found "})
}

}


module.exports = {
    AskQuestion,
    getAllQuestions,
    deleteQuestion,
    voteQuestion
}
