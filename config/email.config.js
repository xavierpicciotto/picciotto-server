const nodemailer = require('nodemailer')
const authSmtp = require('./smtpID.config')

//NODEMAILER config
 async function main(emailTarget,emailContent) {
    let transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: authSmtp,
      tls: {
        rejectUnauthorized: false
      }
    });
    let info = await transporter.sendMail({
      from: '"PICCIOTTO-XM" <picciotto-xm@xavier-picciotto.com>', // sender address
      to: emailTarget, // list of receivers
      subject: "Confirmation Email", // Subject line
      text: "", // plain text body
      html: emailContent, // html body
    }).catch(err => {
      res.status(500).send({message: `envoi d'email compromit ${err}`})
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

module.exports.main = main