const express = require('express')
const app = express()
const instruments = require('./libs/instruments')

app.use(express.json())

app.get('/', async (req, res) => {
  res.send({
    message: "its ok!"
  })
})

app.get('/instruments', async (req, res) => {
  res.send(await instruments.getAll())
})

// app.get('/instruments/:id', async (req, res) => {
  
// })

app.listen(3000, () => {
  console.log('api is running...');
})