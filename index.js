const express = require('express')
const app = express()
const instruments = require('./libs/instruments')
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/', async (_, res) => {
  res.send({
    message: "its ok!"
  })
})

app.get('/instruments', async (_, res) => {
  res.send(await instruments.getAll())
})

// app.get('/instruments/:id', async (req, res) => {

// })

app.listen(PORT, () => {
  console.log('api is running on port ' + PORT);
})