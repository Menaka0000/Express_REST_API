const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../schemas/user.schema');
const router = express.Router();

const User = mongoose.model('User', userSchema);

router.post('/', async (req, res) => {
    console.log(req.body)
    console.log('req received')
    try {
        const userCount = await User.find({userName: req.body.userName}).count();
        console.log(userCount)
        if (userCount === 0) {
            res.status(404).json('User with the given userName was not found!');
            return;
        }
        const user = await User.find({userName: req.body.userName})
        console.log(user[0].password)

        if (user[0].password === req.body.password) {
            let newRes = {userName:user[0].userName,id:user[0]._id,email:user[0].email}
            res.status(200).json(newRes);
        }else {
            res.status(400).json('Password is incorrect, please check it again');
        }
    } catch (error) {
        sendUnknownError(error);
    }

    function sendUnknownError(error) {
        console.log(error);
        res.status(500).send('Unknown error has occurred');
    }
});

module.exports = router;