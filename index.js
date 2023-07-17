const express= require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
var cors = require('cors')
const router = require("./Routes/users")
const questionroutes = require("./Routes/questions")
const answerRoutes = require("./Routes/answer")
const app = express()




mongoose.connect("mongodb+srv://capstone1:capstone1@capstone1.ek2c5vk.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true}  )
.then(
  (res) =>  {
    console.log(`Database is Connected`)
  },
  err => { console.log(err) }
);


const PORT = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/',(req,res)=>{
    res.send("Welcome to STACKOVERFLOW CLONE Backend")
})

//Importing
app.use("/users",router)
app.use('/questions',questionroutes)
app.use('/answer',answerRoutes)

app.listen(PORT,()=>{
    console.log(`server started ${PORT}`)
})





