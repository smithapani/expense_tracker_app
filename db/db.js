const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path : "../config/.env"});

mongoose.connect("mongodb+srv://smithapani:6AKJuzDrEeu$i5K@cluster0.cpghovo.mongodb.net/ExpenseDB?retryWrites=true&w=majority",
                {
                    useNewUrlParser : true,
                    useUnifiedTopology : true
                },(err) => {
    if(!err){
        console.log("Mongodb connection succeded");
    }

    else{
        console.log("There is error in connection",err.message);
    }
}) 




