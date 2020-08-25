const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RequestSchema = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
    daysOff: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = Request = mongoose.model('requests', RequestSchema)