const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

app.use(express.json()) //used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use(cors({
    origin: 'http://localhost:3000/',
    credentials: true,
}))

app.post('/submit', (req, res) => {
  res.send('Thank you for submitting the form for Hero Digital!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})