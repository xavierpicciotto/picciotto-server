module.exports = (req, res, next) => {
    const prerequisiteName = /^[-._a-z0-9]+$/gi
    const prerequisitePassword = /[A-Z]/g
    try {
        if (req.body.user_name.length <= 3 || req.body.password.length <= 3 || !prerequisiteName.test(req.body.user_name) || !prerequisitePassword.test(req.body.password)) {
            return res.status(400).send({
                message: "Syntaxe des identifiants invalide"
            })
        }
        next()
    } catch {
        return res.status(500).send({
            message: 'erreur server de verification'
        })
    }
}