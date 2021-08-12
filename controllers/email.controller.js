const db = require('../models/')
const Email = db.email
const nodeMailer = require('../config/email.config')

//fonction utilisé pour l'expiration du code de confirmation
async function codeExpiration(id) {
    Email.destroy({
        where: {
            id: id
        }
    }).then(deleted => {
        if (deleted === 1) {
            return console.log(`Code expiré id ${id}`)
        }
        if (deleted !== 1) {
            return console.log('error expiration du code de verification')
        }
    }).catch(err => console.log(err))
}

exports.register = (req, res) => {
    const isEmailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!isEmailFormat.test(req.body.email)) {
        return res.status(400).send({
            message: 'Format email non valide'
        })
    }
    const code = () => {
        //creer un code pin pour la verification d'email
        let code = Math.floor(Math.random() * 1001) + ''
        code = code.padStart('4', '0')
        return code
    }
    const verifyCode = code() //fixe le code
    Email.create({
        email: req.body.email,
        verifyCode: verifyCode
    }).then((email) => {
        //Délai d'expiration du Code de verif
        setTimeout(() => {
            codeExpiration(email.id)
        }, 600000/*1min*/)
        //appel la fonction de nodeMailer
        nodeMailer.main(req.body.email, `<html>
        <body>
            <h1>PICCIOTTO-XM</h1>
            <h2>Vérification de l'email ${req.body.email}</h2>
            <h2>Methode n°1</h3>
            <div class="code">
                <h1>CODE : ${verifyCode} </h1>
            </div>
        </body>
        </html>`).then(() => {
            return res.status(200).send({
                message: `Email sauvegardé, un code de verification va vous êtres envoyé. Penser a regarder dans les spams si vous n'avez pas reçu l'email de confirmation`
            })
        }).catch(() => {
            res.status(400).send({
                message: 'vérifier les donées saisies'
            })
        });
    }).catch(err => res.status(500).send({
        message: `Error : ${err}`
    }))
}