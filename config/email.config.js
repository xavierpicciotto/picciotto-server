const nodemailer = require('nodemailer')

//NODEMAILER config
 async function main(emailTarget,emailContent) {
    console.log(emailTarget,'&&&&',emailContent)
    let transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: 'picciotto-xm@xavier-picciotto.com',
        pass: 'RUTTEUCJO',
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    let info = await transporter.sendMail({
      from: '"PICCIOTTO-XM" <picciotto-xm@xavier-picciotto.com>', // sender address
      to: emailTarget, // list of receivers
      subject: "Confirmation Email", // Subject line
      text: "Hello world?", // plain text body
      html: emailContent, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }
  //main().catch(console.error);

module.exports.main = main