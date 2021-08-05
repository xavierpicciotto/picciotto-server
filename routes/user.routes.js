const controller = require('../controllers/user.controller')
const verifyToken = require('../middleware/userJwt')

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    
    app.post('/api/user/signup',controller.signup)
    app.post('/api/user/signin',controller.signin)
    app.put('/api/user/modify/:id',verifyToken,controller.modify)
    app.delete('/api/user/delete/:id',verifyToken,controller.deleteUser)
}
