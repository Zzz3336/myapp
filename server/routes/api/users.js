var express = require('express');
var router = express.Router();
var User = require('../../models/User')
var token = require('../../models/token/index')

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  const user = req.body
  const tokenKey = token.en(user.username)
  var result = await User.findOne({
    where: {
      username: user.username,
      pwd: user.pwd
    }
  }).then((result) => {
    console.log(result)
    if (result == null) {
      res.json({
        msg: '登录失败',
        status: 404
      })
    } else {
      res.json({
        msg: '登录成功',
        status: 200,
        tokenKey
      })
    }
  }, err => {
    console.log(err)
  })
});

router.post('/getUser', async (req, res, next) => {
  // console.log(req.body.token);
  const tokenKey = token.de(req.body.token)
  res.send({
    newUser: tokenKey
  })
})

module.exports = router;