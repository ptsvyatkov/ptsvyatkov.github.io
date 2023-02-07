const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    place: { type: mongoose.Schema.Types.ObjectId, reqired: true, ref:'Place' },
    user: {type: mongoose.Schema.Types.ObjectId, reqired: true},
    checkIn: { type: Date, reqired: true },
    checkOut: { type: Date, reqired: true },
    name: { type: String, reqired: true },
    phone: { type: String, reqired: true },
    price: { type: Number, reqired: true }
})

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;