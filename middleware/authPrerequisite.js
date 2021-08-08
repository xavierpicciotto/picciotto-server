module.exports = (req, res, next) => {
    const prerequisiteName = /^[-._a-z0-9]+$/gi
    const prerequisitePassword = /[A-Z]/g
    let user_name = req.body.user_name
    let password = req.body.password
    try {
        if (user_name !== undefined && typeof (user_name) !== "string" || password !== undefined && typeof (password) !== "string") {
            return res.status(400).send({
                message: "Type des identifiants invalide"
            })
        }
        if (user_name !== undefined && user_name.length <=3 || password !== undefined && password.length <= 3) {
            return res.status(400).send({
                message: "Longueur des identifiants invalide"
            })
        }
        if (user_name !== undefined && !prerequisiteName.test(user_name) || password !== undefined && !prerequisitePassword.test(password)) {
            return res.status(400).send({
                message: "Syntaxe des identifiants invalide"
            })
        }
    } catch {
        return res.status(500).send({
            message: 'erreur server de verification'
        })
    }
    next()
}