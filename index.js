const express = require('express');

//Create an express
const app = express();

// Handling json bod request
const bodyParser = require('body-parser');
app.use(bodyParser,json());

//To include db
const db = require("./db.js");

app.get("/",function(req,res){

    res.json({
        status:true,
        message:"Loans appliaction API is runining successfuly"
    })
});

//Get all loans appliactions

app.get("/loans",(req,res)=>{

    db.serialize(()=>{
        db.all("select * from loans",(error,rows)=>{
            console.log(rows,"::Rows")
        })
    })
})