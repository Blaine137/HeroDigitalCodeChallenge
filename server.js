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

app.post('/submit', (req, res) => {
  console.log(req.body)
  res.setHeader('Content-Type', 'application/json');
    	/* if required data is not empty and in the body send success else fail */
	if (req.body.firstName && req.body.lastName && req.body.email && req.body.euResident && (req.body.advances || req.body.alerts || req.body.other)) {
		res.statusCode = 200;
		res.send({
			"status": "success",
			"message": "Thank You. You are now subscribed."
		});
	} else {
		res.statusCode = 400;
		res.send({
			"status": "error",
			"message": "Invalid Subscription request."
		});
	}
})

app.post('/*', (req, res) => {
	res.statusCode = 404;
	res.send({
		"status": "error",
		"message": "The endpoint you are looking for dose not exist."
	});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})