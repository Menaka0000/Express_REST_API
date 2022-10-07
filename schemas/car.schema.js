const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    registeredId:{
        type: String,
        require: true,
        unique: true,
        minLength: [4, 'Must be at least 4, got {VALUE}']
    },
    userId: {
        type: String,
        require: true
    }
    ,
    manufacturer:{
        type: String,
        require: true,
        minLength: [4, 'Must be at least 4, got {VALUE}']
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true,
        minLength: [5, 'Must be at least 5, got {VALUE}']
    }
})
module.exports = carSchema;
