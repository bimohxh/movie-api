'use strict'
var router = require('express').Router()
var url = require('url')
var qiniu = require('../lib/qiniu')


// router.post('/upload', function (req, res, next) {
//   qiniu.upload(req.body.file).then((state) => {
//     res.send(state)
//   })
// })


router.get('/uptoken', function (req, res, next) {
  let filename = `${req.query.prefix}/${Date.now()}.png`
  res.send({
    token: qiniu.uptoken(filename),
    filename: filename
  })
})

module.exports = router
