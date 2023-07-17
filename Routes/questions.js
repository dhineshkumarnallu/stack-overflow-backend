const express = require("express")
const Questions = require('../Models/Questions')
const {AskQuestion,getAllQuestions,deleteQuestion, voteQuestion} = require('../Controllers/Question')
const {auth}= require("../Middleware/auth")


//import 
const router = express.Router()

router.post('/ask', auth,AskQuestion)
router.get('/get',getAllQuestions)
router.delete('/delete/:id',auth, deleteQuestion)
router.patch('/vote/:id', auth, voteQuestion)

module.exports = router
