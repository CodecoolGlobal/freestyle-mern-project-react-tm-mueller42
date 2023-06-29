const mongoose = require('mongoose');
const express = require('express');
let Animal = require('./models/animal.js');
let Vote = require('./models/votes.js');
const cors = require("cors");
const fs = require("fs");
const { error } = require('console');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://onclickmagic:onClickMongo@onclickmagic.8blvh8a.mongodb.net/");


app.use(function (req, res, next) {
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
// app.get('/animal', (req, res) => {
//     Animal.find({})
//     .then(data => res.json(data))
//     .catch(error => res.json(error))

// })

// app.get("/animal", (req,res) => {
//     Animal.find({})
//     .then(data => res.json(data))
//     .catch(error => res.json(error))
// });

app.get('/animal', (req, res) => {
    Animal.find()
        .then(animal => {
        // console.log("animal", animal)
        res.json(animal);
        })
        .catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
        });
    });

app.post ("/animal", (req,res) => {
    const id = req.body.id;
    const title = req.body.title;
    const comment = req.body.comment;
    const breed = req.body.breed;
    const favourite = req.body.favourite;
    const rating = req.body.rating;
    const createdAt = Date.now();
    const imgUrl = req.body.imgUrl;
    const type = req.body.type;


    Animal.find({id:id})
    .then(data => {
        if (data.length===0){
            const animal = new Animal(req.body);
              animal.save()
                .then(() => res.json(`${type} saved to Database`))
                .catch(err => res.status(400).json({ success: false }));
        }else {
            const animal = data[0];          
            animal.title = title;
            animal.comment = comment;
            animal.rating = rating;
            animal.save()
            .then(() => res.send(JSON.stringify("Animal updated")))
            .catch(error => {
                console.error(error);
            });
        }
    })

})

app.delete('/animal/:id', (req, res) => {
    const id = req.params.id;

    Animal.findByIdAndDelete(id)
    .then(() => {
        console.log('Animal deleted:', id);
        res.sendStatus(204);
    })
    .catch(error => {
        console.error('Error deleting Animal:', error);
        res.status(500).send('Internal Server Error');
    });
})

app.get('/votes', (req, res) => {
    Vote.find({name:"votes"})
    .then(votes => res.json(votes))
    .catch(error => {
        console.error('Error fetching Votes:', error);
        res.status(500).send('Internal Server Error');
        });
})

app.post('/votes', (req, res) => {
    Vote.find({name:"votes"})
    .then(data => {
        if (data.length===0){
            const votes = new Vote(req.body);
            votes.save()
              .then(() => res.json(`votes saved to Database`))
              .catch(err => res.status(400).json({ success: false }));
        } else {
            const votes = data[0];
            const newVote = req.body;
            for(entry in votes) {
                if (newVote[entry]) {votes[entry] = votes[entry] + (newVote[entry])};
            }
            votes.save()
            .then(() => res.json(`votes saved to Database`))
            .catch(err => res.status(400).json({ success: false }));
        } 
    })
})

app.listen(4000, () => console.log('Server started on port 4000'));