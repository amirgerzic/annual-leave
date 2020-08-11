const express = require("express")
const requests = express.Router()
const cors = require("cors");

const Request = require("../models/Request");
const User = require("../models/User");
requests.use(cors())

requests.post('/request', (req, res) => {
  const requestData = {
    employee: req.body.employee,
    reason: req.body.reason,
    additionalInfo: req.body.additionalInfo,
    date: req.body.date,
    status: "PENDING"
  }
  Request.findOne({
    employeeId: req.body.employeeId
  }).then(employeeId => {
    if (employeeId) {
      Request.findOne({
        date: req.body.date
      }).then(date => {
        if (!date) {
          Request.create(requestData)
            .then(request => {
              res.json({ status: request.reason + 'Request Sent!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          Request.findOne({
            status: req.body.date
          }).then(status => {
            if (status !== "DENIED" || status !== "APPROVED") {
              Request.create(requestData)
                .then(request => {
                  res.json({ status: request.reason + 'Request Sent!' })
                })
                .catch(err => {
                  res.send('error: ' + err)
                })
            } else {
              res.json({ error: 'Request on this date already exists' })
            }
          })
        }
      })
    } else {
      Request.create(requestData)
        .then(request => {
          res.json({ status: request.reason + 'Request Sent!' })
        })
        .catch(err => {
          res.send('error: ' + err)
        })
    }
  }).catch(err => {
    res.send('error: ' + err)
  })
})

requests.get('/requestData', (req, res) => {
  Request.find({
  })
    .then(request => {
      if (request) {
        res.json(request)
      } else {
        res.send('Request does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

requests.put('/updateStatus', (req, res) => {
  const updateData = {
    $set: { status: req.body.status }
  }
  Request.findByIdAndUpdate(req.body._id, updateData)
    .then(_id => {
      res.send(_id + ' Status Updated to '+req.body.status)
    })
})
module.exports = requests