import axios from 'axios';

export const login = user => {
  return axios
    .post('users/login', {
      username: user.username,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const register = user => {
  return axios
    .post('/users/register', {
      name: user.name,
      jobTitle: user.jobTitle,
      department: user.department,
      email: user.email,
      phone: user.phone,
      username: user.username,
      password: user.password,
      daysAvailable: user.daysAvailable,
      typeOfUser: user.typeOfUser,
      daysUsed: user.daysUsed
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const request = leave => {
  return axios
    .post('/requests/request', {
      date: leave.date,
      name: leave.name,
      daysOff: leave.daysOff,
      reason: leave.reason,
      additionalInfo: leave.additionalInfo,
      employeeId: leave.employeeId,
      status: leave.status
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const status = update => {
  return axios
    .put('/requests/updateStatus', {
      _id: update._id,
      status: update.status,
      finalize: update.finalize
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const updateUser = update => {
  return axios
    .put('/users/updateUser', {
      _id: update._id,
      username: update.username,
      password: update.password,
      name: update.name,
      jobTitle: update.jobTitle,
      department: update.department,
      email: update.email,
      phone: update.phone,
      daysAvailable: update.daysAvailable,
      typeOfUser: update.typeOfUser
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const daysAvailable = update => {
  return axios
    .put('/users/updateDaysAvailable', {
      _id: update._id,
      daysOff: update.daysOff,
      status: update.status
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const userDataById = id => {
  return axios
    .get('/users/userDataById', {
        _id: id
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}

export const requestData = id => {
  console.log(id)
  return axios
    .get('/requests/requestData', {
      params: {
        status: id.status,
        finalize: id.finalize
      }
    })
    .then(res => {
      return res.data}
      )
    .catch(err => {
      console.log(err)
    })
}

export const deleteUser = id => {
  console.log(id)
  return axios
    .delete('/users/delete', {
      params: {
        _id: id
      }  
    })
    .then(res => { 
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const deleteRequest = id => {
  console.log(id)
  return axios
    .delete('/requests/delete', {
      params: {
        _id: id
      }  
    })
    .then(res => { 
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const requestDataById = id => {
  return axios
    .get('/requests/requestDataByEmployeeId',  {
      params:{
        employeeId: id
      }
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}