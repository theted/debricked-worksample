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

// set filesize limits
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}))

// allow CORS
app.use(cors())

// enable files upload
app.use(fileUpload({ createParentPath: true }))

// serve static files
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'src')))

// receive file uploads in form of POST requests
app.post('/upload', async (req, res, next) => {

  // require files
  if (!req.files)
    return res.status(400).send('No files were uploaded.')

  // get file name
  let file = req.files.data
  let fullName = __dirname + '/uploads/' + file.name

  // move the file 
  // TODO; read JSON, set name of repository
  file.mv('./uploads/' + file.name)

  let output = {
    status: true,
    message: 'File is uploaded',
    data: {
      name: file.name,
      mimetype: file.mimetype,
      size: file.size
    }
  }

  // now that we have saved file locally, send it to Debricked API
  let uploadResult = await debricked.uploadFile(fullName)

  // conclude the upload
  // TODO: add support for adding multiple files before conclude...
  let concludeResult = await debricked.concludeUpload(uploadResult.ciUploadId)

  // append result to output
  output.ciUploadId = uploadResult.ciUploadId
  output.uploadProgramsFileId = uploadResult.uploadProgramsFileId
  output.concludeResult = concludeResult // <- temp

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
