const mongoose = require('mongoose');
//Defining task Schema
const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    days: []
});

const Habit = mongoose.model('habit', habitSchema);

module.exports = Habit;