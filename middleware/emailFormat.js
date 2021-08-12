module.exports = (req, res, next) => {
    const isEmailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    try {
        if (!isEmailFormat.test(req.body.email)) {
            return res.status(400).send({
                message: 'Format email non valide'
            })
        }
        next()
    }catch{
        res.status(400).send({message: "Error middleware de verification"})
    }
}