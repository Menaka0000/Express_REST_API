const mongoose = require('mongoose');
const dotenv  = require('dotenv').config();

console.log(dotenv.parsed);

const dbConnection = mongoose.connect(process.env.MONGODB_URI);

module.exports = dbConnection;
