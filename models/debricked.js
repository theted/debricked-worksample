/**
 * Debricked API bindings
 */

require('dotenv').config()

const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const version = '1.0'
const endpoint = process.env.DEBRICKED_ENDPOINT
const apiURL = endpoint + version + '/open/'
const authURL = endpoint + 'login_check'
const username = process.env.DEBRICKED_USERNAME
const password = process.env.DEBRICKED_PASSWORD
let currentToken = false

/**
 * Get a new token, using username/password as defined in `.env` file
 */
// const getToken = async () => TOKEN
const getToken = async () => {
  let result = await axios.post(authURL, {
    // ! gotcha with parameter names in this request
    _username: username,
    _password: password
  })

  return result.data.token
}

const renewToken = async () => {
  let token = getToken()
  currentToken = token
  return token
}

/**
 * Ensure a valid token; renew if missing
 * TODO: optimize; add validation check
 */
const ensureToken = async () => {
  return (currentToken) ? currentToken : renewToken()
}

/**
 * Wrapper for HTTP request to Debricked API
 */
const debrickedRequest = async (path, data = false, attempts = 0) => {
  let token = await ensureToken()
  let method = (data) ? 'post' : 'get'
  let url = apiURL + path
  let config = { headers: { 'Authorization': "bearer " + token } }

  // ! bit of a hax...
  axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }

  // debug
  console.log(' -> Debricked: get URL: ' + url, '-----------')

  return axios[method](url, data, config)
    .then(res => res.data)
    .catch(error => {
      console.log('ERROR >> ', error.response.status)

      // attempt to renew token on 401 errors
      if (attempts < 1 && error.response.status === 401) {
        return renewToken().then(debrickedRequest(path, data, ++attempts))
      } else {
        return 'ERROR: ' + error.response.status
      }

      return error
    })
}

/**
 * Get status of an upload
 */
const status = async (id) => debrickedRequest('ci/upload/status?ciUploadId=' + id)

/**
 * Get supported dependency file names
 */
const supported = async () => debrickedRequest('supported/dependency/files')

module.exports = { getToken, debrickedRequest, status, supported }
