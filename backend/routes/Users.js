const express = require("express")
const users = express.Router()
const cors = require("cors");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const userData = {
      name: req.body.name,
      jobDescription: req.body.jobDescription,
      username: req.body.username,
      password: req.body.password,
      daysAvailable: req.body.daysAvailable,
      typeOfUser: req.body.typeOfUser,
      status: req.body.status
    }
    User.findOne({
      username: req.body.username
    })
      .then(user => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash
            User.create(userData)
              .then(user => {
                res.json({ status: user.username + ' Registered!' })
              })
              .catch(err => {
                res.send('error: ' + err)
              })
          })
        } else {
          res.json({ error: 'User already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })
  
  users.post('/login', (req, res) => {
    User.findOne({
      username: req.body.username
    })
      .then(user => {
        console.log(req.body.username)
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              _id: user._id,
              name: user.name,
              username: user.username,
              typeOfUser: user.typeOfUser
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 600
            })
            res.send(token)
          } else {
            res.json({ error: 'User does not exist' })
          }
        } else {
          res.json({ error: 'User does not exist' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  users.get('/userData', (req, res) => {
    User.find({ 
      typeOfUser: 'user'
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })
  
  
  users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  
    User.findOne({
      _id: decoded._id
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })
  
  module.exports = users