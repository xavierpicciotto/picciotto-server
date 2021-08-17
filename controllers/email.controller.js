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
            return console.log(`Code expire id ${id}`)
        }
        if (deleted === 0) {
            return
        }
        if (deleted !== 1) {
            return console.log('error expiration du code de verification')
        }
    }).catch(err => console.log(err))
}

//Creer un demande de verification pour l'email renseigné
exports.register = (req, res) => {
    function code(num, length) {
        //Génére des codes pour la verification d'email
        let code = Math.floor(Math.random() * num) + ''
        code = code.padStart(length, '0')
        return code
    }
    const verifyCode = code(1001, "4") //fixe la valeur le code
    const linkCode = code(10000000000000000001, "20")
    //appel la fonction de nodeMailer
    nodeMailer.main(req.body.email, `<html>
    <body>
        <h1>PICCIOTTO-XM</h1>
        <h2>Vérification de l'email ${req.body.email}</h2>
        <h2>Methode n°1</h2>
        <div class="code">
            <h1>CODE : ${verifyCode} </h1>
        </div>
        <h2>Methode n°2</h2>
        <h3>Cliquer sur le lien ci-dessous 🙂</h3>
        <p>https://picciotto-xm.tech/api/email/validate/${linkCode}</p>
    </body>
    </html>`).then(() => {
        Email.create({
            email: req.body.email,
            verifyCode: verifyCode,
            linkCode: linkCode
        }).then((email) => {
            //Délai d'expiration du Code de verif
            setTimeout(() => {
                codeExpiration(email.id)
            }, 300000 /*5min*/ )
            return res.status(200).send({
                message: `Email sauvegardé ${new Date}, un code de verification va vous êtres envoyé (valide 5min). Penser a regarder dans les spams si vous n'avez pas reçu l'email de confirmation`
            })
        }).catch(err => res.status(500).send({
            message: `Error : ${err}`
        }))
    }).catch((err) => {
        res.status(400).send({
            message: 'vérifier les donées saisies',
            err
        })
    });
}

exports.emailVerifcation = (req, res) => {
    const Codeformat = /^[\d]{4}$/g
    if (!Codeformat.test(req.body.code)) {
        return res.status(400).send({
            message: "Le format du code de vérification est éronné"
        })
    }
    Email.findOne({
        where: {
            email: req.body.email
        }
    }).then(email => {
        if (email === null) {
            return res.status(404).send({
                message: `l'email: ${req.body.email} n'existe pas dans la database.`
            })
        }
        const verifyCode = email.verifyCode === req.body.code
        if (verifyCode) {
            codeExpiration(email.id)
            return res.status(200).send({
                message: `L'adresse mail: ${email.email} est bien Validée, Le serveur est à titre démonstratif les données vont être effacées de la mémoire`
            })
        }
        if (verifyCode !== true) {
            return res.status(400).send({
                message: `Le code est incorrect`
            })
        }
    }).catch(err => {
        return res.status(500).send({
            message: err
        })
    })
}

exports.linkVerification = (req, res) => {
    const linkCodeFormat = /^[\d]{20}$/g
    const testFormat = linkCodeFormat.test(req.params.linkCode)
    if (!testFormat) {
        return res.status(400).send({
            message: `Le lien est incorrect`
        })
    }
    Email.findOne({
        where: {
            linkCode: req.params.linkCode
        }
    }).then(email => {
        codeExpiration(email.id)
        return res.status(200).send({
            message: `L'adresse mail: ${email.email} est bien Validée, Le serveur est à titre démonstratif les données vont être effacées de la mémoire`
        })
    }).catch(err => {
        return res.status(404).send({
            message: "Le lien n'est associé a aucun email en mémoire"
        })
    })
}

exports.relayContact = (req, res) => {
    function testFormat(data) {
        if(typeof(data) !== "string"){
            return 'invalide'
        } else {
            return 'valide'  
        }
    }
    if(testFormat(req.body.name) === 'invalide' || testFormat(req.body.company) === 'invalide' || testFormat(req.body.message) === 'invalide'){
        return res.status(400).send({
            message: 'Veuillez seulement utiliser des lettres des chiffres et (.:-\'_)'
        })
    }
    nodeMailer.main('xavierpicciotto@gmail.com', `<html>
    <body>
        <h1>Contact Portfolio</h1>
        <h2>email : ${req.body.email}</h2>
        <h3>nom: ${req.body.name}</h3>
        <h3>entreprise: ${req.body.company}</h3>
        <h2>Message</h2>
        <h3>${req.body.message}</h3>
    </body>
    </html>`).then(() => {
        return res.status(200).send({
            message: `Votre fiche de contact a bien été transmise`
        })
    }).catch(err => {
        return res.status(500).send({
            message: "Un problème est survenu lors de l'envoi de la fiche : " + err
        })
    })
}