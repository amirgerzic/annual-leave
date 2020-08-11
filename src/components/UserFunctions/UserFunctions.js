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
      jobDescription: user.jobDescription,
      username: user.username,
      password: user.password,
      daysAvailable: user.daysAvailable,
      typeOfUser: user.typeOfUser,
      status: user.status
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
    .post('users/request', {
      reason: leave.reason,
      additionalInfo: leave.additionalInfo
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
      status: update.status
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}