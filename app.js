const express = require('express');
const dbConnection  = require('./config/dbconfig');
const user = require('./routes/user');
const login = require('./routes/login');
const vehicle = require('./routes/vehicle');

const app = express();

/*let cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

//this express.json() method return a piece of middleware and then the use method use it in the req. processing pipeline.
app.use(express.json());

dbConnection
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('error when trying to connect mongodb server...', err))

const baseURL = '/api/';

app.use(`${baseURL}users`,user);
app.use(`${baseURL}login`,login);
app.use(`${baseURL}vehicles`,vehicle);

app.get('/',(req, res)=>{
    console.log('req was received');
})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`app is started to listen on ${port}`)
})


