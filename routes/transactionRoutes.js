const express = require("express");
const path = require('path');
const multer = require("multer");
const {gettransactions,posttransaction,deletetransaction} = require("../controllers/transactionController");

const router = express.Router();

router.route("/").get(gettransactions).post(posttransaction);

router.route("/:id").delete(deletetransaction);

function checkFileType(file,cb){
    const allowedFileTypes = /jpg|jpeg|png/;

    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    console.log(extname);

    if(extname){
        return cb(null,true)
    }
    else{
        cb(new Error("Please upload images only"));
    }
}

const upload = multer({
    dest : "avatars",
    limits : {
        fileSize : 1000000
    },

    fileFilter(req,file,cb){

        // Check for pdf only here

        /*
        if(!file.originalname.endsWith('.pdf')){
            return cb(new Error('Please upload a pdf'))
        }

        cb(null, true);
        */

        checkFileType(file,cb);
    }
}).single('avatar',15);

router.post("/avatar", upload,(req,res) => {
    res.send()
},(err,req,res,next) => {
    return res.status(400).json({
        'error' : err.message
    });
})

module.exports = router;