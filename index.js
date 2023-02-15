const express = require('express');

//Create an express
const app = express();

// Handling json bod request
const bodyParser = require('body-parser');
app.use(bodyParser.json())

//To include db
const db = require("./db.js");

app.get("/", function (req, res) {

    res.json({
        status: true,
        message: "Loans appliaction API is runining successfuly"
    })
});

//Get all loans appliactions

app.get("/loans", (req, res) => {
    db.serialize(() => {
        db.all("select * from loans", (error, rows) => {
            if (error) {
                res.json({
                    status: false,
                    error: error
                })
            } else {
                res.json({
                    status: true,
                    data: rows
                })
            }
        })
    })
});

app.post("/new-loan", function (req, res) {
    const loanData = req.body;

    const { firstName, lastName, email, loanAmount, purpose } = loanData;
    if (!firstName) {
        // return res.status(400).json({
        //     status: false,
        //     error: "Please Provide First Name"
        // })
        return sendErrorResponse(res, "Please Provide First Name");
    }
    if (!lastName) {
        // return res.status(400).json({
        //     status: false,
        //     error: "Please Provide Last Name"
        // })
        return sendErrorResponse(res, "Please Provide Last Name");
    }
    if (!email) {
        // return res.status(400).json({
        //     status: false,
        //     error: "Please provide Email"
        // })
        return sendErrorResponse(res, "Please provide Email");
    }
    if (!loanAmount) {
        return res.status(400).json({
            status: false,
            error: "Please provide Laon Amount"
        })
    }
    if (!purpose) {
        return res.status(400).json({
            status: false,
            error: "Please define purpose of applying loan"
        })
    }

    res.json({
        status: true,
        message: "New Loan Application Created... ",
        data: loanData
    });
});

function sendErrorResponse(res, errorMessage) {
    return res.status(400).json({
        status: false,
        error: errorMessage
    })
};

app.listen(3000, function () {
    console.log(`API Services are running on http://localhost:3000`);
});