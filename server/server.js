const mongoose = require('mongoose');
const express = require('express');
// let Todo = require('./model/todo.js');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})



app.listen(4000, () => console.log('Server started on port 4000'));