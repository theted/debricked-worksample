/**
 * Debricked API bindings
 */

require('dotenv').config()

const axios = require('axios')
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

/**
 * Ensure a valid token; renew if missing
 * TODO: optimize; add validation check
 */
const ensureToken = async () => {
  if (!currentToken) currentToken = await getToken()
  return currentToken
}

/**
 * Wrapper for HTTP request to Debricked API
 */
const debrickedRequest = async (path, data = false) => {
  let token = await ensureToken()
  let method = (data) ? 'post' : 'get'
  let url = apiURL + path
  let config = { headers: { 'Authorization': "bearer " + token } }

  // ! bit of a hax...
  axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }

  // TODO: support for query params, like;
  // /ci/upload/status?ciUploadId=1090

  // debug
  console.log(' -> Debricked: get URL: ' + url, '-----------')

  return axios[method](url, data, config)
    .then(res => {
      return res.data // <- gotcha!
    })
    .catch(error => {
      console.error(error)
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
