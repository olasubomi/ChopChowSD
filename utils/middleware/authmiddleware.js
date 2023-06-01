const {findUser, validateToken} = require('../../repository')

const protect = async (req, res, next) => {
    let token
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
  
        const decoded = await validateToken(token)
  
        const user = await findUser({email: decoded.email})
        
        if (user) {
          req.user = user
          next()
        } else {
          throw new Error('User does not exists')
  
          res.status(401)
        }
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  }

  module.exports = {
    protect
  }