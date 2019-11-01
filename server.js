const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const debricked = require('./models/debricked.js')
const fileUpload = require('express-fileupload')
const debug = require('debug')('app')
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
app.post('/upload', (req, res, next) => {
  // Object.keys(req.body).forEach(key => console.log(key, '=>', req.body[key]))

  if (!req.files)
    return res.status(400).send('No files were uploaded.')

  let file = req.files.data
  file.mv('./uploads/' + file.name)

  // send response / debugger
  console.log({
    status: true,
    message: 'File is uploaded',
    data: {
      name: file.name,
      mimetype: file.mimetype,
      size: file.size
    }
  })

  res.send('Upload complete: ' + file.name)
})

// serve index.html to all other GET requests
app.get('/*', (req, res, next) => {
  if (!res._header) res._header = '' // <- prevents error thrown in some middleware (why??)
  res.sendFile(path.join(__dirname, 'index.html'))
})

// start server
app.listen(config.port, () => debug('Server runining @ port ' + config.port))
