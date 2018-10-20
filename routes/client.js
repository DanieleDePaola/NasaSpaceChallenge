var express = require('express')
//var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var Signals = [];

var router = express.Router()
//router.use(cookieParser())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/signal', function (req, res, next) {
    var Signal = {}
    console.log(req.body)
    Signal.time = req.body.time;
    Signal.latitude = req.body.latitude;
    Signal.longitude = req.body.longitude;
    Signal.description = req.body.description;
    Signal.stato = 0;
    Signal.danger = req.body.danger;
    Signals.push(Signal)
    res.json({'ok': Signals.toString()})
})
router.get('/signal', function (req, res, next) {
    res.json(Signals)
})

module.exports = router
