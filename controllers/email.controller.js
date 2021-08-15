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
        if(deleted === 0){
            return
        }
        if (deleted !== 1) {
            return console.log('error expiration du code de verification')
        }
    }).catch(err => console.log(err))
}

//Creer un demande de verification pour l'email renseigné
exports.register = (req, res) => {

    const code = () => {
        //creer un code pin pour la verification d'email
        let code = Math.floor(Math.random() * 1001) + ''
        code = code.padStart('4', '0')
        return code
    }
    const verifyCode = code() //fixe la valeur le code
    Email.create({
        email: req.body.email,
        verifyCode: verifyCode
    }).then((email) => {
        //Délai d'expiration du Code de verif
        setTimeout(() => {
            codeExpiration(email.id)
        }, 300000/*5min*/)
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
                message: `Email sauvegardé, un code de verification va vous êtres envoyé (valide 10min). Penser a regarder dans les spams si vous n'avez pas reçu l'email de confirmation`
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

exports.emailVerifcation =(req,res)=>{
    const Codeformat = /^[\d]{4}$/g
    if(!Codeformat.test(req.body.code)){
        return res.status(400).send({message: "Le format du code de vérification est éronné"})
    }
    Email.findOne({
        where: {
            email: req.body.email
        }
    }).then(email => {
        if(email === null){
            return res.status(404).send({message: `l'email: ${req.body.email} n'existe pas dans la database.`})
        }
        const verifyCode = email.verifyCode === req.body.code
        if(verifyCode){
            codeExpiration(email.id)
            return res.status(200).send({message: `L'adresse mail: ${email.email} est bien Validée, Le serveur est à titre démonstratif les données vont y être supprimées`})
        }
        if(verifyCode !== true){
            return res.status(400).send({message: `Le code est incorrect`})
        }
    }).catch(err => {
        return res.status(500).send({message: err})
    })
}