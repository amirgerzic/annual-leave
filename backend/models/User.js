const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String
    },
    jobDescription: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    daysAvailable: {
        type: String
    },
    typeOfUser: {
        type: String
    },
    status: {
        type: String
    }
})

module.exports = User = mongoose.model('users', UserSchema)