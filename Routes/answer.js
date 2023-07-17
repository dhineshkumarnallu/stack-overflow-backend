const express = require("express")
const router = express.Router()
const {postAnswer,deleteAnswer} = require('../Controllers/Answer')
const {auth} = require("../Middleware/auth")

router.patch('/post/:id',auth, postAnswer)
router.patch('/delete/:id',auth, deleteAnswer)

module.exports = router