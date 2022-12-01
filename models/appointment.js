// import mongoose
const mongoose = require('mongoose');

// define schema for an Appointment
var appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Appointment name is required'
    },
    property: {
        type: String,
        required: 'Property selection is required'
    },
    date: {
        type: String,
        required: 'Date is Required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    phone: {
        type: String,
        required: 'Phone number is required'
    },
    description: {
        type: String,
    }
})

// make public
module.exports = mongoose.model('Appointment', appointmentSchema);