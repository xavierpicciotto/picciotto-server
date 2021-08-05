const jwt = require('jsonwebtoken')
const config = require('../config/jwt.config')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (token === undefined) {
            return res.status(401).send({
                message: "Token valide requis"
            })
        }
        const decodedToken = jwt.verify(token, config.secret)
        const id = req.params.id * 1
        if (id === decodedToken.id) {
            next()
        } else {
            return res.status(401).send({
                message: "Token valide requis"
            })

        }
    } catch {
        return res.status(401).send({
            message: new Error('Mauvaise requete')
        })
    }
}