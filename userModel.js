const { mongoose, Schema } = require("mongoose");

const User = mongoose.model('user', new Schema({
    name: {
        type: String,
    },
}));

module.exports = User;