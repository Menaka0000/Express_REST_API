const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../schemas/user.schema');
const router = express.Router();

const User = mongoose.model('User', userSchema);

router.get('/:userName', async (req, res) => {
    if (await User.find({userName: req.params.userName}).count()===0) {
       res.status(404).send('User with the given userName was not found!');
       return;
    }
    const user = await User.find({userName: req.params.userName});
    res.status(200).send(user);

});

module.exports = router;