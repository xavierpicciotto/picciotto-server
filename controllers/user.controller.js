const db = require('../models/')
const config = require('../config/jwt.config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = db.user

//INSCRIPTION
exports.signup = (req, res) => {
    if (req.body.user_name == undefined || req.body.password == undefined) {
        return res.status(400).send({
            message: `Indentifiant incomplet, user_name et password reqsuis.`
        })
    }
    User.create({
        user_name: req.body.user_name,
        password: bcrypt.hashSync(req.body.password, 5)
    }).then(() => {
        return res.status(201).send({
            message: `Utilisateur correctement enregistré !`
        })
    }).catch(err => {
        if(err.message == "Validation error"){
            return res.status(400).send({
                message: "Username déjà utilisé."
            }) 
        }
        return res.status(500).send({
            message: err.message
        })
    })
}

//CONNEXION
exports.signin = (req, res) => {
    User.findOne({
        where: {
            user_name: req.body.user_name
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'Indentifiant invalid.'
            })
        }
        const verifyPassword = bcrypt.compareSync(`${req.body.password}`, user.password)

        if (!verifyPassword) {
            return res.status(401).send({
                accessToken: null,
                message: 'Mot de passe incorrect.'
            })
        }
        const token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: 86400
        }) //24h})
        return res.status(200).send({
            id: user.id,
            user_name: user.user_name,
            accessToken: token
        })

    }).catch(err => {
        return res.status(500).send({
            message: err.message
        })
    })
}

//MISE A JOUR
exports.modify = (req, res) => {

    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        const newName = req.body.user_name !== undefined ? req.body.user_name : user.user_name
        const newPasssword = req.body.password !== undefined ? bcrypt.hashSync(req.body.password, 5) : user.password
        const userUpdate = {
            user_name: newName,
            password: newPasssword
        }
        User.update(
            userUpdate, {
                where: {
                    id: req.params.id
                }
            }).then(() => {
            return res.status(201).send({
                message: 'Modification succes.'
            })
        }).catch(err => {
            return res.status(500).send({
                message: `Error: ${err}`
            })
        })
    }).catch(err => {
        return res.status(404).send({
            message: 'Utilisateur non existant.' + err
        })
    })
}

//SUPRESSION
exports.deleteUser = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleted => {
        if (deleted === 1) {
            return res.status(200).send({
                message: 'Suppresion succes.'
            })
        }
        if (deleted !== 1) {
            return res.status(404).send({
                message: "Utilisateur inexistant."
            })
        }

    }).catch(err => {
        return res.status(500).send({
            message: "erreur de supresion : " + err
        })
    })
}