require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())

app.post('/webhook', (req, res) => {

  console.log(req.body)
  console.log(req.headers)

  if (req.headers.authorization === process.env.ZOOM_WEBHOOK_VERIFICATION_TOKEN) {

    var response = { message: 'Authorized request to Webhook Sample Node.js.', status: 200 }

    console.log(response.message)

    // business logic here, example make API request to Zoom or 3rd party

    res.status(response.status)
    res.json(response)
  } else {

    var response = { message: 'Unauthorized request to Webhook Sample Node.js.', status: 200 }

    console.log(response.message)

    res.status(response.status)
    res.json(response)
  }
})

app.listen(port, () => console.log(`Webhook Sample Node.js listening on port ${port}!`))
