const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CarSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model : {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    fuel: {
        type: String,
        enum: ['Gasoline', 'Diesel', 'Electric', "Hybrid"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    }

},
        {timestamps: true},
        {collection: "cars"}
);

module.exports = Car = mongoose.model('Car', CarSchema)