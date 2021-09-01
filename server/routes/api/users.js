var express = require('express');
var router = express.Router();
var User = require('../../models/User')

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  const user = req.body
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
        status: 200
      })
    }
  }, err => {
    console.log(err)
  })
});

module.exports = router;