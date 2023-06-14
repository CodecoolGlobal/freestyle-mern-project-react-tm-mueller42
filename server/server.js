const mongoose = require('mongoose');
const express = require('express');
let Animal = require('./models/animal.js');
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
    next();
})

function readDataFile(file) {
    const content = fs.readFileSync(file, "utf8");
    const data = JSON.parse(content);
    return data;
}

app.get("/dognames", (req, res) => {
    const data = readDataFile("./names.json");
    res.send(data.dogs);
})

app.get("/catnames", (req, res) => {
    const data = readDataFile("./names.json");
    res.send(data.cats);
})


app.post ("/animal", (req,res) => {
    console.log(req.body);
    const id = req.body.id;
    const title = req.body.title;
    const comment = req.body.comment;
    const breed = req.body.breed;
    const favourite = req.body.favourite;
    const votes = req.body.votes;
    const createdAt = Date.now();
    const imgUrl = req.body.imgUrl;
    const type = req.body.type;

    const animal = new Animal({
        id,
        title,
        comment,
        breed,
        favourite,
        votes,
        createdAt,
        imgUrl,
        type
      });
      animal.save()
        .then(() => res.json(`${type} saved to Database`))
        // .then(() => res.json("OK"))
        .catch(err => res.status(400).json({ success: false }));

    // res.send(JSON.stringify("ok"));
})


app.listen(4000, () => console.log('Server started on port 4000'));