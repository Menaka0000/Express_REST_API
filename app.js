const express = require('express');
const dbConnection  = require('./config/dbconfig');
const user = require('./routes/user');
const login = require('./routes/login');

const app = express();

//this express.json() method return a piece of middleware and then the use method use it in the req. processing pipeline.
app.use(express.json());

dbConnection
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('error when trying to connect mongodb server...', err))

const baseURL = '/api/';

app.use(`${baseURL}users`,user);
app.use(`${baseURL}login`,login);

app.get('/',(req, res)=>{
    console.log('req was received');
})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`app is started to listen on ${port}` )
})


