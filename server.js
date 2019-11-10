const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const debricked = require('./models/debricked.js')
const fileUpload = require('express-fileupload')
const debug = require('debug')('app')
const utils = require('./models/utils.js')
const app = express()
const config = { port: 4244 }

require('dotenv').config()

/**
 * Upload file(s) to debrickd API
 */
const uploadFiles = async files => {
  let uploadResult = false
  let allResults = []

  let output = {
    status: true,
    files: []
  }

  for (let file of files) {
    let fullName = __dirname + '/uploads/' + file.name
    let name = ''

    // move the file 
    file.mv('./uploads/' + file.name)

    // read JSON, set name of repository
    if (file.name.split('.')[1] == 'json') {
      let jsonData = await JSON.parse(file.data)
      name = jsonData.name
    } else {
      name = 'noname'
    }

    output.files.push({
      name: name,
      mimetype: file.mimetype,
      size: file.size
    })

    // .. if we have previous arr
    let ciUploadId = (allResults.length > 0)
      ? allResults[0].ciUploadId
      : false

    // now that we have saved file locally, send it to Debricked API
    uploadResult = await debricked.uploadFile(fullName, name, file.name, ciUploadId)
    allResults.push(uploadResult)
  }

  return { output, allResults }
}

// set filesize limits
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}))

// allow CORS
app.use(cors())

// enable files upload
app.use(fileUpload({ createParentPath: true, debug: true }))

// serve static files
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'src')))

// receive file uploads in form of POST requests
app.post('/upload', async (req, res, next) => {

  // require files
  if (!req.files)
    return res.status(400).send('No files were uploaded.')

  let files = req.files.data

  if (!Array.isArray(files)) files = [files]
  console.log(typeof files)

  let uploadResult = false
  let { output, allResults } = await uploadFiles(files)

  // conclude the upload
  let concludeResult = await debricked.concludeUpload(allResults[0].ciUploadId)

  // append result to output
  output.ciUploadId = allResults[0].ciUploadId
  output.uploadProgramsFileId = allResults[0].uploadProgramsFileId

  res.send(output)
})

// get status using debricked API...
app.get('/status/:id', async (req, res, next) => {
  let status = await debricked.status(req.params.id).catch(err => res.send(err))
  res.send(status)
})

// serve index.html to all other GET requests
app.get('/*', (req, res, next) => {
  if (!res._header) res._header = '' // <- prevents error thrown in some middleware (why??)
  res.sendFile(path.join(__dirname, 'index.html'))
})

// start server
app.listen(config.port, () => debug('Server runining @ port ' + config.port))
