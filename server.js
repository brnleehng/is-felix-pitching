// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const probables = require('mlbprobablepitchers');

const app = express();

var fs = require('fs');

// file is included here:
eval(fs.readFileSync('utility.js').toString());

// Parsers for POST data
app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

app.get('/matchups', function (req, res) {
	const todayDate = getDateTime();

	probables.get(todayDate, (err, matchups) => {
		console.log(matchups)
  		res.json(matchups)
	});
})

app.get('*', function(req, res) {
	res.sendFile('./src/index.html', {root: __dirname}); // load the single view file (angular will handle the page changes on the front-end)
});

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));