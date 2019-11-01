const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const debug = require('debug')('app')
const app = express()
const config = { port: 4244 }

// set filesize limits
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}))

// serve static files
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'src')))

// receive file uploads in form of POST requests
app.post('/upload', (req, res, next) => {

  let keys = Object.keys(req.body)

  keys.forEach(key => {
    console.log(key, '=>', req.body[key])
  })

  // TODO: generate temp name
  let { name, data } = req.body
  let fileName = path.join(__dirname, 'input', name)

  // write file
  fs.writeFile(fileName, data, 'base64', function (err) {
    if (err) console.log(err);

    // TODO: send file to Debricked API endpoint
    console.log('...done writing fi;e')

  })

  res.send('we do get your POST...!')
})

// serve index.html to all other GET requests
app.get('/*', (req, res, next) => {
  if (!res._header) res._header = '' // <- prevents error thrown in some middleware (why??)
  res.sendFile(path.join(__dirname, 'index.html'))
})

// start server
app.listen(config.port, () => debug('Server runining @ port ' + config.port))
