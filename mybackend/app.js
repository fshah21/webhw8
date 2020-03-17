const express = require('express')
const app = express()
const port = 5000
var guardianApi =  "https://content.guardianapis.com/search?api-key=36f5166b-ebc7-476b-85a9-eb6ab839f1b0&section=(sport|business|technology|politics)&show-blocks=all";
var request = require('request')

app.get('/home', (req, res) => res.send('Hello World!'))

app.get('/guardianhome', (req, res) =>
	request( guardianApi, function( error, response, body) {
		if(!error && response.statusCode == 200){
			var json = JSON.parse(body);
			var jsonData = json.response.results;
			res.send(jsonData);
		}
	})
)

app.listen(port, () => console.log(`Example listening on port ${port}!`))