const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../schemas/user.schema');
const router = express.Router();

const User = mongoose.model('User', userSchema);

router.post('/', async (req, res) => {
    const body=req.body;
    if (body.userName===undefined || body.email===undefined || body.password===undefined){
        res.status(400).json('body doesnt have the correct format!')
        return;
    }

    try {
        const userCount = await User.find({userName: req.body.userName}).count();
        if (userCount !== 0) {
            res.status(400).json('This userName is already taken!');
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Unknown error has occurred');
    }

    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const result = await user.save();
        console.log(result);
        res.status(200).json('User account has been successfully created!')
    } catch (error) {
        console.log(error.message);
        if (error.message) res.status(400).json(error.message);
        else res.status(500).json('Unknown error has occurred, Please try again!');
    }
});

module.exports = router;