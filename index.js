require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())

app.post('/webhook', (req, res) => {

  console.log(req.body)
  console.log(req.headers);

  if (req.headers.authorization === process.env.ZOOM_WEBHOOK_VERIFICATION_TOKEN) {

    // business logic here, example make API request to Zoom or 3rd party

    res.status(200)
    res.send()
  } else {
    res.status(401)
    res.send('Unauthorized request to Webhook Sample Node.js.')
  }
})

app.listen(port, () => console.log(`Webhook Sample Node.js listening on port ${port}!`))
