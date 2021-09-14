const Sequelize = require("sequelize")

const sequelize = new Sequelize('myapp1', 'root', '88623989', {
  host: '192.168.1.239',
  port: '3306',
  dialect: 'mysql'
})

// async function conn() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// conn()

module.exports = {
  sequelize,
  Sequelize
}