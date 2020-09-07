const mongoose = require("mongoose")
const { Int32 } = require("mongodb")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
    },
    department:{
        type: String,
    },
    email:{
        type: String
    },
    phone: {
        type: Number
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    daysAvailable: {
        type: Number
    },
    typeOfUser: {
        type: String,
        required: true
    },
    daysUsed: {
        type: Number
    }
})

module.exports = User = mongoose.model('users', UserSchema)