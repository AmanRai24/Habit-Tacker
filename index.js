//Initial Setup
const express = require('express');
const app = express();
//Port Number 
const port = 8000;

//for parsing of url
app.use(express.urlencoded());

//set up the view engine
app.set('view engine','ejs');
app.set('views', './views');

//set up for static files
app.use(express.static('assets'));

//connection to database
const db = require('./config/mongoose');

//use express router
app.use("/",require('./routes'));

//Starting up server
app.listen(port, function(err){
    if(err){
        console.log("Error found",err);
        return;
    }
    console.log("Server is up and running at port:",port);
});

