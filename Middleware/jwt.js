const jwt = require('jsonwebtoken')


const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    try {
        const verification = jwt.verify(token, process.env.SECRET_KEY)
        req.payload = verification.userId
        next()
    } catch (error) {
        res.status(400).json(error)
    }
}
module.exports = jwtMiddleware