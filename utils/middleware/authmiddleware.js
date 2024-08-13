const { findUser, validateToken } = require('../../repository')

const protect = async (req, res, next) => {

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      let token = req.headers.authorization.split(' ')[1]

      if (!token) {
        console.log("token not present")
        // throw new Error('Not authorized, no token')
        return res.status(401).json({ message: "User not authenticated" })

      }

      const decoded = await validateToken(token)

      const user = await findUser({ email: decoded.email })

      if (user) {
        req.user = user
        next()
      } else {
        // throw new Error('User does not exists')

        return res.status(401).json({ message: "Invalid user token" })
      }
    } catch (error) {
      console.error(error)
      res.status(403).json({ message: 'Not authorized, token failed' })
      // throw new Error('Not authorized, token failed')
    }
  }
  else {
    return res.status(401).json({ message: "User not authenticated" })
  }
}

module.exports = {
  protect
}