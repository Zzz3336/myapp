const jwt = require("jsonwebtoken")

token = {
  en(str) {
    let tokenKey = jwt.sign(str, 'jiami')
    return tokenKey
  },
  de(str) {
    try {
      let tokenKey = jwt.verify(str, 'jiami')
      return {
        status: 200,
        tokenKey
      }
    } catch (error) {
      return {
        status: 404
      }
    }
  }
}

module.exports = token