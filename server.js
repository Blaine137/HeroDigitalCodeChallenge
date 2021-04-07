const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')

app.use(express.json()) //used to parse JSON bodies
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.get('/submit', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send({data: 'Thank you for submitting the form for Hero Digital!'})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})