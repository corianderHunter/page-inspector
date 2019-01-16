'use strict';
let fs = require('fs')
let path = require('path')

let md5 = require('md5');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json({
  limit: '50mb'
}));


app.use(express.static(__dirname));

//To allow cross origin request
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res, next) {
  next()
});

app.get('/record', function (req, res) {
  let filename = md5(req.query.url) + '.json'
  res.header("Content-Type", 'application/json');
  res.sendFile(path.join(__dirname, 'json', filename));
})

//To receive push request from client
app.post('/record', function (req, res) {
  let {
    url,
    records
  } = req.body
  writeJson(url, records)
  res.send(req.body)
});

app.listen(8000, function () {
  console.log('Local Server : http://localhost:8000');
});


function writeJson(url, data) {
  let fileName = md5(url) + '.json'
  fs.writeFileSync('json/' + fileName, JSON.stringify(data))
}