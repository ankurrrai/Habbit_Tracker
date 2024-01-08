const mongoose=require('mongoose');

const habbitSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:['Pending','Done'  ]
    }
})