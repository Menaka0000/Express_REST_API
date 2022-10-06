const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        minLength: [4, 'Must be at least 4, got {VALUE}']
    },
    email: {
        type: String,
        require: true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Email is invalid!']
    },
    password: {
        type: String,
        require: true,
        minLength: [5, 'Must be at least 5, got {VALUE}']
    }
})
module.exports = userSchema;

