
const mongoose = require('mongoose')


var propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Property name is required'
    },
    location: {
        type: String,
        required: 'Location is required'
    },
    price: {
        type: String,
        required: 'Price is required'
    },
    address: {
        type: String,
        required: 'Property address is required'
    }
})

// make public 
module.exports = mongoose.model('Property', propertySchema)