require("./db/db");
const express = require("express");
const dotenv = require("dotenv");
const transRouter = require("./routes/transactionRoutes");

dotenv.config({path: './config/.env'});

const app = express();

app.use(express.json());
app.use(express.urlencoded({"extended" : true}));

app.use("/api/v1/transactions",transRouter);

app.get("/",(req,res) => {
    res.send("This is get route");
})

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
