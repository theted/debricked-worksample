/**
 * Debricked API bindings
 */

require('dotenv').config()

const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const utils = require('./utils.js')
const version = '1.0'
const endpoint = process.env.DEBRICKED_ENDPOINT
const apiURL = endpoint + version + '/open/'
let currentToken = false

/**
 * Get a new token, using username/password as defined in `.env` file
 */
const getToken = async () => axios.post(endpoint + 'login_check', {
  _username: process.env.DEBRICKED_USERNAME,
  _password: process.env.DEBRICKED_PASSWORD
}).then(res => res.data.token)

/**
 * Renew token
 */
const renewToken = async () => {
  console.log(' > RENEW TOKEN')
  let token = getToken()
  currentToken = token
  return token
}

/**
 * Ensure a valid token; renew if missing
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

      // attempt to renew token on authorization errors
      return (attempts < 1 && error.response.status === 401)
        ? renewToken().then(debrickedRequest(path, data, ++attempts))
        : 'ERROR: ' + error.response.status
    })
}

/**
 * Upload file to Debricked API
 * @param {string} file Path to file
 * TODO: refactor!
 */
const uploadFile = async (filePath, fileName) => {
  const url = apiURL + 'uploads/dependencies/files'
  const token = await ensureToken()
  const form_data = new FormData()
  const repositoryName = 'Test@' + utils.timestamp()

  // add file
  form_data.append("fileData", fs.createReadStream(filePath))

  // add fields
  form_data.append('repositoryName', repositoryName)
  form_data.append('commitName', 'CommitName')

  // prepare headers
  let headers = form_data.getHeaders()
  headers["Authorization"] = "bearer " + token
  headers["Content-Type"] = "multipart/form-data"
  headers["accept"] = "application/json"

  // send requst to debricked API
  return axios({
    method: 'post',
    processData: false,
    contentType: 'multipart/form-data',
    cache: false,
    url: url,
    data: form_data,
    headers: headers
  }).then(res => res.data).catch(err => console.log(err))
}

/**
 * Get status of an upload
 */
const status = async (id) => debrickedRequest('ci/upload/status?ciUploadId=' + id)

/**
 * Get supported dependency file names
 */
const supported = async () => debrickedRequest('supported/dependency/files')

module.exports = { getToken, debrickedRequest, uploadFile, status, supported }
