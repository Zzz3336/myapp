const {
  Sequelize,
  sequelize
} = require('../database/index');

const Student = sequelize.define('student', {
  stuId: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  stuName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  banJi: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  xueYuan: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  timeIn: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  telphone: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

Student.sync()

module.exports = Student