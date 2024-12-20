const express = require("express");
const cors = require("cors")

const mongoose = require('mongoose');
const User = require("./userModel");
const Todo = require("./todoModel");

mongoose.connect('mongodb://localhost:27017/todo').then(() => console.log('Connected!'));

const app = express();

app.use(express.json());
app.use(cors());

app.post("/addData", async (req, res, next) => {
    try {
        if (!req.body.userId) {
            return next(new Error("Please Send userId"));
        }
        const user = await User.findById(req.body.userId);
        if (!user) {
            return next(new Error("User not found, Please create one"));
        }
        const todo = await Todo.create({
            name: req.body.name,
            task: req.body.task,
            userId: user.id
        });

        res.status(200).json({
            success: true,
            data: todo,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
});

app.post("/addUser", async (req, res, next) => {
    try {
        if (!req.body.name) {
            return next(new Error("Please Send name"));
        }
        var user = await User.findOne({
            name: req.body.name,
        });
        if(user){
            return res.status(200).json({
                success: true,
                data: user,
            });
        }

        user = await User.create({
            name: req.body.name
        });

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
});

app.post("/todoList", async (req, res, next) => {
    try{
        if(!req.body.userId){
            return next(new Error("Please send userId"))
        }
        const todos = await Todo.find({
            userId: req.body.userId
        })

        res.status(200).json({
            success: true,
            data: todos,
        });
    }catch(e){
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
});

app.listen(3001);