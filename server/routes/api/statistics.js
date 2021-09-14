var express = require('express');
var router = express.Router();
var Student = require('../../models/Student')

/**
 * 根据学院查询人数
 */
router.get('/selSta', async function (req, res, next) {
  if (req.query.howtosel == "学院") {
    var dsgtotal = await Student.findAll({
      where: {
        xueYuan: "大数据"
      }
    })
    var jsjtotal = await Student.findAll({
      where: {
        xueYuan: "计算机"
      }
    })
    var gltotal = await Student.findAll({
      where: {
        xueYuan: "管理"
      }
    })
    var ystotal = await Student.findAll({
      where: {
        xueYuan: "艺术"
      }
    })
    var cjtotal = await Student.findAll({
      where: {
        xueYuan: "财经"
      }
    })
    var wytotal = await Student.findAll({
      where: {
        xueYuan: "外语"
      }
    })
    var jztotal = await Student.findAll({
      where: {
        xueYuan: "建筑"
      }
    })
    var dqtotal = await Student.findAll({
      where: {
        xueYuan: "电气"
      }
    })
    var tytotal = await Student.findAll({
      where: {
        xueYuan: "体育"
      }
    })
    res.json({
      dsg: dsgtotal,
      jsj: jsjtotal,
      gl: gltotal,
      ys: ystotal,
      cj: cjtotal,
      wy: wytotal,
      jz: jztotal,
      dq: dqtotal,
      ty: tytotal
    })

  } else if (req.query.howtosel == '班级') {
    var rjgctotal = await Student.findAll({
      where: {
        banJi: "软件工程"
      }
    })
    var dsjctotal = await Student.findAll({
      where: {
        banJi: "大数据"
      }
    })
    var gsgltotal = await Student.findAll({
      where: {
        banJi: "工商管理"
      }
    })
    var scyxtotal = await Student.findAll({
      where: {
        banJi: "市场营销"
      }
    })
    var sjcdtotal = await Student.findAll({
      where: {
        banJi: "视觉传达"
      }
    })
    var xmtdtotal = await Student.findAll({
      where: {
        banJi: "新媒体"
      }
    })
    var jjxtotal = await Student.findAll({
      where: {
        banJi: "经济学"
      }
    })
    var jrxtotal = await Student.findAll({
      where: {
        banJi: "金融学"
      }
    })
    var yytotal = await Student.findAll({
      where: {
        banJi: "英语"
      }
    })
    var dytotal = await Student.findAll({
      where: {
        banJi: "德语"
      }
    })
    var fytotal = await Student.findAll({
      where: {
        banJi: "法语"
      }
    })
    var eytotal = await Student.findAll({
      where: {
        banJi: "俄语"
      }
    })
    var jzsjtotal = await Student.findAll({
      where: {
        banJi: "建筑设计"
      }
    })
    var fjyltotal = await Student.findAll({
      where: {
        banJi: "风景园林"
      }
    })
    var zdhtotal = await Student.findAll({
      where: {
        banJi: "电力系统及其自动化"
      }
    })
    var xjstotal = await Student.findAll({
      where: {
        banJi: "电工理论与新技术"
      }
    })
    var tyjytotal = await Student.findAll({
      where: {
        banJi: "体育教育"
      }
    })
    var ydkftotal = await Student.findAll({
      where: {
        banJi: "运动康复"
      }
    })
    res.json({
      rjgc: rjgctotal,
      dsj: dsjctotal,
      gsgl: gsgltotal,
      scyx: scyxtotal,
      sjcd: sjcdtotal,
      xmt: xmtdtotal,
      jjx: jjxtotal,
      jrx: jrxtotal,
      yy: yytotal,
      dy: dytotal,
      fy: fytotal,
      ey: eytotal,
      jzsj: jzsjtotal,
      fjyl: fjyltotal,
      zdh: zdhtotal,
      xjs: xjstotal,
      tyjy: tyjytotal,
      ydkf: ydkftotal
    })
  }
});



module.exports = router;