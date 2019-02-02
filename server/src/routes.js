let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let bodyParser = require('body-parser')

let multipartMiddleware = multipart();

// create application/json parser
let jsonParser = bodyParser.json()

router.get('/', (req, res) => {
    res.send('success')
})

module.exports = router;