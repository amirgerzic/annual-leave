const express = require("express")
const requests = express.Router()
const cors = require("cors");

const Request = require("../models/Request");
requests.use(cors())

requests.post('/request', (req, res) => {
  const requestData = {
    name: req.body.name,
    employeeId: req.body.employeeId,
    reason: req.body.reason,
    daysOff: req.body.daysOff,
    additionalInfo: req.body.additionalInfo,
    date: req.body.date,
    status: req.body.status,
    finalize: 0
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
              res.json({ status: 'Request Sent!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else if (date.status == "DENIED") {
          Request.create(requestData)
            .then(request => {
              res.json({ status: ' Request Sent!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'Request on this date already exists' })
        }
      })
    }
  }).catch(err => {
    res.send('error: ' + err)
  })
})

requests.get('/requestData', (req, res) => {
  if (req.query.finalize == 1) {
    Request.find({
      finalize: req.query.finalize,
      status: req.query.status
    }).then(finalized => {
      if (finalized) {
        res.send(finalized)
      } else {
        res.send('Request does not exist')
      }
    })
      .catch(err => {
        res.send('error: ' + err)
      })
  } else {
    Request.find({
      finalize: req.query.finalize
    })
      .then(request => {
        if (request) {
          res.send(request)
        } else {
          res.send('Request does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
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
  }).then(request => {
    const updateData = {
      $set: { status: req.body.status, finalize: req.body.finalize }
    }
    if (request.status === "PENDING") {
      Request.findByIdAndUpdate(req.body._id, updateData)
        .then(_id => {
          res.send('Request Updated')
        })
    }
    else if (request.status === req.body.status) {
      if(req.body.finalize==1){
      Request.findByIdAndUpdate(req.body._id, updateData)
        .then(_id => {
          res.send('Request Finalized')
        })}
        else{
          res.send('Request already '+request.status)
        }
    } else (
      Request.findByIdAndUpdate(req.body._id, updateData)
        .then(_id => {
          res.send('Request Updated')
        })
    )
  })
})

requests.delete('/delete', (req, res) => {
  Request.findByIdAndDelete({
    _id: req.query._id
  })
    .then(
      res.json('Request deleted')
    )
})

module.exports = requests