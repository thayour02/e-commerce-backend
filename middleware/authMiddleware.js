const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
    const authHeader = req?.headers?.authorization

    if (!authHeader || !authHeader?.startsWith('Bearer')) {
        next('authorization failed')
    }
    const token = authHeader?.split(" ")[1];

     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "invalid token" })
        }
        req.decoded = decoded
        next();
    })
}
module.exports = userAuth