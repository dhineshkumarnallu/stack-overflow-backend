const mongoose = require("mongoose")

const QuestionSchema = mongoose.Schema({
    questionTitle:{
        type:String,
        //required:'Question must have Title'
       },
    questionBody:{
        type:String,
        //required:'Question must have Body'
    },
    questionTags:{
        type:[String],
        //required:'Question must have Tags'
    },
    noOfAnswers:{
            type:Number,
            default:0
    }, 
    votes:{
      type:Number,
      default:0
    },
      upVotes:{
        type:[String],
        default:[]
      },
      downVotes:{
        type:[String],
        default:[]
      },
      userPosted:{
        type:String,
        //required:"Question must have an author"
      },
      userId:{
        type:String,
      },
      askedOn:{
        type:Date,
        default:Date.now
      },
      answer:[{
        answerBody:String,
        userAnswered:String,
        userId:String,
        answeredOn:{
            type:Date,
            default:Date.now
        }
      }]

    
})

module.exports = mongoose.model("Question",QuestionSchema)