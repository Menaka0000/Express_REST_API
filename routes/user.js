const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../schemas/user.schema');
const router = express.Router();

const User = mongoose.model('User', userSchema);

router.post('/', async (req, res) => {

    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });

    if (await User.find({userName: req.body.userName}).count()!==0){
        res.status(400).send('This userName is already taken!');
        return;
    }

    try {
        const result = await user.save();
        console.log(result);
        res.status(200).send('User account has been successfully created!')
    } catch (error) {
        console.log(error.message);
        if (error.message) res.status(400).send(error.message);
        else res.status(400).send('An error has occurred, Please try again!');
    }
});

module.exports = router;