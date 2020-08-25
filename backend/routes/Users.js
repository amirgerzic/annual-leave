const express = require("express")
const users = express.Router()
const cors = require("cors");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const crypto = require("crypto");
const User = require("../models/User");
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
    daysUsed: req.body.daysUsed
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
users.get('/userDataAll', (req, res) => {
  User.find({
    typeOfUser: { $ne: 'admin' }
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

users.get('/userDataById', (req, res) => {
  User.findById({
    _id: req.body._id
  })
    .then(user => {
      console.log(req.body._id)
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

users.delete('/delete', (req, res) => {
  console.log(req.query._id)
  User.findByIdAndDelete({
    _id: req.query._id
  })
    .then(
      res.json('User deleted')
    )
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
users.put('/updateUser', (req, res) => {
  User.findById({
    _id: req.body._id
  }).then(user => {
    const updateData = {
      $set: {
        username: req.body.username,
        name: req.body.name,
        jobDescription: req.body.jobDescription,
        daysAvailable: req.body.daysAvailable,
        typeOfUser: req.body.typeOfUser
      }
    }
    User.findByIdAndUpdate(req.body._id, updateData)
      .then(user => {
        res.send({ status: user.username + ' Updated!' })
      }).catch(err => {
        res.send('error: ' + err)
      })
  })
})

users.put('/updateDaysAvailable', (req, res) => {
  User.findById({
    _id: req.body._id
  }).then(user => {
    if (req.body.status === 'APPROVED') {
      if (user.daysAvailable >= req.body.daysOff) {
        const updateData = {
          $set: {
            daysAvailable: user.daysAvailable - req.body.daysOff,
            daysUsed: user.daysUsed + req.body.daysOff
          }
        }
        User.findByIdAndUpdate(req.body._id, updateData)
          .then(days => {
            res.send('Days Updated to ' + days.daysAvailable)
          })
      } else {
        res.json({ error: 'Request on this date already exists' })
      }
    } else if (req.body.status === 'DENIED') {
      if (user.daysUsed >= req.body.daysOff) {
        const updateData = {
          $set: {
            daysAvailable: user.daysAvailable + req.body.daysOff,
            daysUsed: user.daysUsed - req.body.daysOff
          }
        }
        User.findByIdAndUpdate(req.body._id, updateData)
          .then(days => {
            res.send('Days Updated to ' + days.daysAvailable)
          })
      }
    }
  }
  ).catch(err => {
    res.send('error: ' + err)
  })
})
module.exports = users