const mongoose = require('mongoose');
const express = require('express');
let Todo = require('./model/todo.js');
const cors = require("cors");

mongoose.connect("mongodb+srv://tm-mueller42:c0dec00lAtlas@codecool01.reeb5ic.mongodb.net/")

const app = express();
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get("/todo", (req,res) => {
    Todo.find({})
    .then(data => res.json(data))
    .catch(error => res.json(error))
});

app.post ("/todo", (req,res) => {
    console.log(req.body);
    const title = req.body.title;
    const comment = req.body.comment;
    const createdAt = Date.now();
    const todo = new Todo({
        title,
        comment,
        createdAt,
      });
      todo.save()
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json({ success: false }));

    // res.send(JSON.stringify("ok"));
})

app.delete ("/todo/:todoId", (req, res) => {
    console.log(req.params.todoId);
    Todo.deleteOne({ _id: `${req.params.todoId}` })
    .then(todo => {
        console.log(todo);
    })
    .catch(error => {
        console.error(error);

    });
    res.send(JSON.stringify("Todo deleted"))
})

app.patch ("/todo/:todoId", (req, res) => {
    console.log(req.body);
    const title = req.body.title;
    const comment = req.body.comment;
    Todo.findById(req.params.todoId)
    .then(todo => {
        todo.title = title;
        todo.comment = comment;
        return todo.save();
    })
    .catch(error => {
        console.error(error);

    });
    res.send(JSON.stringify("Todo updated"))
})

app.listen(4000, () => console.log('Server started on port 4000'));