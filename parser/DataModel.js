'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoordinateSchema = new Schema({
    time: {
        type: Date,
        required: 'Time is required field'
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    },
    accuracy: {
        type: Number
    },
    satellites: {
        type: Number
    },
    provider: {
        type: String
    },
    activity: {
        type: String
    },
    battery: {
        type: Number
    },
});

module.exports = mongoose.model('Coordinate', CoordinateSchema);