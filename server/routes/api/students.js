var express = require('express');
var router = express.Router();
var Student = require('../../models/Student')

/**
 * 获取学生列表
 */
router.post('/getStudata', async (req, res, next) => {
  const currentPage = parseInt(req.body.currentPage) || 1;
  const pageSize = parseInt(req.body.pageSize) || 2;
  let result = await Student.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    offset: (currentPage - 1) * pageSize,
    limit: pageSize
  })
  res.send({
    students: result.rows,
    pagination: {
      currentPage: currentPage,
      pageSize: pageSize,
      total: result.count
    }
  })
});

/**
 * 根据stuId查询数据
 */
router.get('/getStubystuId', async (req, res, next) => {
  const stuId = req.query.stuId;
  var result = await Student.findOne({
    where: {
      stuId: stuId
    }
  })
  res.json({
    result
  })
})

/**
 * 录入学生信息
 */
router.post('/addNewstu', async (req, res, next) => {
  console.log(req.body.stu)
  const stu = req.body.stu
  var result = await Student.create({
    stuId: stu.stuId,
    stuName: stu.stuName,
    xueYuan: stu.xueYuan,
    banJi: stu.banJi,
    timeIn: stu.timeIn,
    email: stu.email,
    telphone: stu.telphone
  }).then(() => {
    res.send({
      msg: '录入成功',
      status: 200,
    })
  }, err => {
    res.send({
      msg: '录入失败',
      status: 404
    })
  })

})

/**
 * 删除学生信息
 */
router.get('/delBystuid', async (req, res, next) => {
  const stuId = req.query.stuId;
  var result = await Student.destroy({
    where: {
      stuId: stuId
    }
  }).then(() => {
    res.send(result)
  }, err => {
    console.log('删除失败')
  })
})


/**
 * 修改学生信息
 */
router.post('/updateStu', async (req, res, next) => {
  console.log(req.body.params.stu);
  const stu = req.body.params.stu
  var result = await Student.update({
    stuName: stu.stuName,
    xueYuan: stu.xueYuan,
    banJi: stu.banJi,
    email: stu.email,
    telphone: stu.telphone
  }, {
    where: {
      stuId: stu.stuId
    }
  }).then(() => {
    res.send({
      msg: '录入成功',
      status: 200,
    })
  }, err => {
    res.send({
      msg: '录入失败',
      status: 404
    })
  })
})

module.exports = router;