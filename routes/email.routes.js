const controller = require('../controllers/email.controller')
const emailFormat = require('../middleware/emailFormat')

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    app.post("/api/email/register",emailFormat,controller.register)
    app.post("/api/email/validate",emailFormat,controller.emailVerifcation)
    app.get("/api/email/validate/:linkCode",controller.linkVerification) 
}