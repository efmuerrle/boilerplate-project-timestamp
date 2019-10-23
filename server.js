// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/timestamp', function(req, res) {
  const date = new Date();
  // console.log('date', date);
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get('/api/timestamp/:date_string', function(req, res, next) {
  let response = {};
  //1. Check if the input is valid
  const date = getValidFormat(req.params.date_string);
  // console.log('date', date);
  //2. If date is valid, return the modified response object
  if (date) {
    if (/[-]/.test(req.params.date_string)) {
      response.unix = date.getTime();
    } else {
      response.unix = date.getTime() / 1000;
    }
    response.utc = date.toUTCString();
  }
  //3. Else return invalid response object
  else {
    // response.unix = null;
    // response.utc = 'Invalid Date';
    response = { error: 'Invalid Date' };
  }

  res.json(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  // var listener = app.listen(5555, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

const getValidFormat = value => {
  let date;
  if (/[-]/.test(value)) {
    date = new Date(value);
  } else {
    date = new Date(value * 1000);
  }
  console.log('date', date);
  // console.log('date.utc', date.toUTCString());
  // console.log('date.unix', date.getTime());
  if (date == 'Invalid Date') {
    return false;
  }
  return date;
};
