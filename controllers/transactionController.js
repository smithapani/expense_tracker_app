const Transaction = require("../models/transactionModel");
const router = require("../routes/transactionRoutes");

//To get all transactions
exports.gettransactions = async (req,res,next) => {
    try{

        //1st method of sort
        /*
        const page = parseInt(req.query.page)-1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || ["amount"];

        if(req.query.sort){
            console.log("Inside req.query.sort");

            sort = req.query.sort.split(",");
            console.log("sort : ",sort);
        }

        else{
            sort = [sort];
            console.log("sort : ",sort);
        }

        let sortBy = {};

        if(sort[1]){
            console.log("Inside if sort[1]");
            sortBy[sort[0]] = sort[1];
            console.log("sortby : ",sortBy[sort[0]]);
        }
        else{
            console.log("Inside else sort[1]");
            sortBy[sort[0]] = 'DESC';
            console.log("sortby : ",sortBy[sort[0]]);
        }

        console.log("sortBy object : ",sortBy);
        */

        /*-----------------------------------------------------------------------------*/

        //2nd method for sort

        const page = parseInt(req.query.page)-1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || ["amount"];

        let sortBy = {};

        if(req.query.sort){
            console.log("Inside req.query.sort");

            const parts = req.query.sort.split(",");
            console.log("parts : ",parts);

            if(parts){
                console.log("Inside parts");

                sortBy[parts[0]] = parts[1] === 'DESC' ? -1 : 1;
                console.log("sortBy[parts[0]] : ",sortBy[parts[0]])
            }

            console.log("sortBy : ",sortBy);
            
        }

        else{
            console.log("Inside else");

            sort[1] = 'ASC';
            sortBy[sort[0]] = sort[1];

            console.log("sortBy[sort[0]] : ",sortBy[sort[0]]);
            console.log("sortBy : ",sortBy);
        }


        const transactions = await Transaction.find({
            $or : [
                {"text" : {$regex : new RegExp(search, "i")}},
                {"category" : {$regex : new RegExp(search, "i")}}
            ]
        }).sort(sortBy).skip(page*limit).limit(limit)

        const total = await Transaction.countDocuments({
            $or : [
                {"text" : {$regex : new RegExp(search, "i")}},
                {"category" : {$regex : new RegExp(search, "i")}}
            ]
        })

        const response = {
            error : false,
            total,
            page : page+1,
            limit,
            transactions
        }

        res.status(201).json(
            response
        )

    }

    
    catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
}

//To post a transaction
exports.posttransaction = async (req,res,next) => {
    
    try{
        const {text,amount,category,description} = req.body;

        const transaction = await Transaction.create({text,amount,category,description});

        res.status(201).json({
            data : transaction
        })
    }
    catch(err){
        console.log("err.errors",err.errors);

        console.log("Values : ",Object.values(err.errors));

        if(err.name == "ValidationError"){

            console.log("***");

            const errMessages = Object.values(err.errors).map((val) => {
                return val.message
            })

            res.status(404).json({
                success : false,
                message : errMessages
            })

        }
        else{
            res.status(500).send("Server error");
        }
        
    }
    
}

//To delete transaction
exports.deletetransaction = async (req,res,next) => {
    
    try{
        const data = await Transaction.findOneAndRemove({_id : req.params.id});

        console.log(data);

        if(data){
            res.status(201).json("Deleted successfully");
        }

        else{
            res.send("No record found with id");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
}

