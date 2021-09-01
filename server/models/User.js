const {
  Sequelize,
  sequelize
} = require('../database/index');

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  pwd: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false
})

User.sync()

module.exports = User