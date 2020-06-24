const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

app.get('/', function (req, res) {
    res.send('hello world')
})

const mongoURI = 'mongodb://localhost:27017/annualLeaves'

mongoose
    .connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

const Users = require('./routes/Users')

app.use('/users', Users);

app.listen(port, () => {
    console.log("Server is running on port "+port)
})
