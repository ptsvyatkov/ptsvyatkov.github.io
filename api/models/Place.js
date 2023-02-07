const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectID, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Date,
    checkOut: Date,
    maxGuests: Number,
    price: Number
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;