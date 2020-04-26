const mongoose = require('mongoose');

const shorturlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        requried: true
    }
})