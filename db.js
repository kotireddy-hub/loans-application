const sqlite3 = require("sqlite3").verbose();

//To connect db we need to open connection
const db = new sqlite3.Database("./sql/loans.db",sqlite3.OPEN_READWRITE,function(error){
    if(!error){
        console.log("DB connected successful... ");
    }
    else{
        console.log("Unable to connect DB");
    }
});

module.exports = db;