const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../schemas/user.schema');
const router = express.Router();

const User = mongoose.model('User', userSchema);

router.get('/:userName', async (req, res) => {
    try {
        const userCount = await User.find({userName: req.params.userName}).count();
        if (userCount === 0) {
            res.status(404).send('User with the given userName was not found!');
            return;
        }
    }catch (error){
        sendUnknownError(error);
    }

    try {
        const user = await User.find({userName: req.params.userName});
        res.status(200).send(user);
    } catch (error) {
        sendUnknownError(error);
    }

    function sendUnknownError(error){
        console.log(error);
        res.status(500).send('Unknown error has occurred');
    }
});

module.exports = router;