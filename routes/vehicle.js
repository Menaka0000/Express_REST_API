const express = require('express');
const mongoose = require('mongoose')
const carSchema = require('../schemas/car.schema');
const router = express.Router();

const Vehicle = mongoose.model('car', carSchema);

router.get('/:userId',async (req,res)=>{
    try {
        const userCount = await Vehicle.find({userId: req.params.userId}).count();
        if (userCount === 0) {
            res.status(404).send('Vehicles with the given userId were not found!');
            return;
        }
    }catch (error){
        sendUnknownError(error,res);
    }

    try {
        const vehicles = await Vehicle.find({userId: req.params.userId});
        res.status(200).send(vehicles);
    } catch (error) {
        sendUnknownError(error,res);
    }
})

router.post('/', async (req, res) => {
    const body = req.body;
    if (body.registeredId === undefined || body.userId === undefined || body.manufacturer === undefined ||
        body.description === undefined || body.price === undefined) {
        res.send('body doesnt have the correct format!');
        return;
    }

    try {
        const vehicleCount = await Vehicle.find({registeredId: req.body.registeredId}).count();
        if (vehicleCount !== 0) {
            res.status(400).send('There is a vehicle registered under the given ID!');
            return;
        }
    } catch (error) {
        sendUnknownError(error,res);
    }

    const car = new Vehicle({
        registeredId: req.body.registeredId,
        userId: req.body.userId,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        price: req.body.price
    })

    try {
        const result = await car.save();
        console.log(result);
        res.status(200).send('Vehicle has been saved successfully!')
    } catch (error) {
        console.log(error.message);
        if (error.message) res.status(400).send(error.message);
        else  sendUnknownError(error,res);
    }
})

function sendUnknownError(error,res){
    console.log(error);
    res.status(500).send('Unknown error has occurred, Please try again!');
}

module.exports = router;