const car = require("../models/car")


exports.test = async (req, res) => {
    res.send("Test carControllers OK")
}

exports.addCar = async (req, res) => {
    try {
        const newCar = req.body

        const savedCar = new car(newCar)

        await savedCar.save();

        res.status(201).send({msg: "Car added successfully", newCar})
    } catch (error) {
        res.status(500).send({msg : "Error adding car", error})
    }
}

exports.getCars = async (req, res) => {
    try {
        const foundCars = await car.find().sort({ createdAt: -1 });
        res.status(200).send({ msg: "Cars Found :", foundCars });
    } catch (error) {
        res.status(500).send({ msg: "Error finding car", error });

    }
}

exports.getCarById = async (req, res) => {
    try {
        const foundCar = await car.findById(req.params.id)
        if (!foundCar) {
            return res.status(404).send({msg: "Car not found"})
        }
        res.status(200).send({msg: "Car Found: ", foundCar})
    } catch (error) {
        res.status(500).send({ msg: "Error finding car by id", error });
    }
}

exports.getCarByModel = async (req, res) => {
    try {
        const foundCars = await car.find({model: req.query.model})
                if (!foundCars) {
                  return res.status(404).send({ msg: "Cars not found" });
                }

        res.status(200).send({msg: "Cars found: ", foundCars})
    } catch (error) {
        res.status(500).send({ msg: "Error finding car by model", error });
    }
}

exports.deleteCar = async (req, res) => {
    try {
        const foundCar = await car.findById(req.params.id)
        if (!foundCar) {
            return res.status(404).send({msg: "Error finding car"})
        }
        await car.findByIdAndDelete(req.params.id);
        res.status(200).send({msg: "Car deleted successfully", foundCar})
    } catch (error) {
        res
                  .status(500)
                  .send({ msg: "Error finding car by id", error });

    }
}

exports.updateCar = async (req, res) => {
    try {
        const {id} = req.params
        const updatedCar = await car.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).send({ msg: "Car successfully updated", updatedCar });
    } catch (error) {
                res
                  .status(500)
                  .send({ msg: "Error updating car", error });

    }
}