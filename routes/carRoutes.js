const express = require("express")
const { test, addCar, getCars, getCarById, getCarByModel, deleteCar, updateCar } = require("../controllers/carControllers")


const Router = express.Router()

// Define routes

Router.get('/test', test)

Router.post('/add_car', addCar)

Router.get('/get_cars', getCars)

Router.get('/get_car_byid/:id', getCarById)

Router.get('/get_cars_bymodel', getCarByModel)

Router.delete('/delete_car/:id', deleteCar)

Router.put('/update_car/:id', updateCar)

// Export the router module
module.exports = Router