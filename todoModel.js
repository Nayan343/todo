const { mongoose, Schema } = require("mongoose");
const User = require("./userModel");
const ObjectId = Schema.ObjectId;

const Todo = mongoose.model('todo', new Schema({
    name: {
        type: String,
    },
    task: {
        type: String,
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    }
}));

module.exports = Todo;