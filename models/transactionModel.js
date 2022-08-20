const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    text : {
        type : String,
        required : [true,"Please provide text"]
    },

    amount : {
        type : Number,
        required : [true,"Please provide positive or negative"]
    },

    category:{
        type : String,
        required : [true,"Please provide category"]
    },

    description:{
        type : String,
        required : false
    }
})

const model = mongoose.model("Transaction",transactionSchema);

module.exports = model;