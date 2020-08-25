const express = require("express")
const requests = express.Router()
const cors = require("cors");

const Request = require("../models/Request");
const User = require("../models/User");
requests.use(cors())

requests.post('/request', (req, res) => {
  const requestData = {
    name: req.body.name,
    employeeId: req.body.employeeId,
    reason: req.body.reason,
    daysOff: req.body.daysOff,
    additionalInfo: req.body.additionalInfo,
    date: req.body.date,
    status: req.body.status
  }
  Request.findOne({
    employeeId: req.body.employeeId
  }).then(employeeId => {
    if (employeeId) {
      Request.findOne({
        date: req.body.date
      }).then(date => {
        console.log(date)
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
            status: req.body.status
          }).then(status => {
            console.log(status.status)
            if (status.status == "DENIED") {
              Request.create(requestData)
                .then(request => {
                  res.json({ status: request.reason + ' Request Sent!' })
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
          res.json({ status: request.reason + 'Reequest Sent!' })
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

requests.get('/requestDataByEmployeeId', (req, res) => {
  Request.find({
    employeeId: req.query.employeeId,
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
  Request.findById({
    _id: req.body._id
  }).then(request =>{
    const updateData = {
        $set: { status: req.body.status }
      }
    if(request.status ==="PENDING"){
      
      Request.findByIdAndUpdate(req.body._id, updateData)
        .then(_id => {
          res.send('Request Updated')
        })
    }
    else if(request.status === req.body.status){
      res.send('Request already '+req.body.status)
    }else(
      Request.findByIdAndUpdate(req.body._id, updateData)
        .then(_id => {
          res.send('Request Updated')
        })
    )
  })
})

requests.delete('/delete', (req, res) => {
  console.log(req.query._id)
  Request.findByIdAndDelete({
    _id: req.query._id
  })
    .then(
        res.json('Request deleted')
    )
})

module.exports = requests