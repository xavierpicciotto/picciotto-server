const controller = require('../controllers/user.controller')
const verifyToken = require('../middleware/userJwt')
const authPrerequisite = require('../middleware/authPrerequisite')
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    
    app.post('/api/user/signup',authPrerequisite,controller.signup)
    app.post('/api/user/signin',authPrerequisite,controller.signin)
    app.put('/api/user/modify/:id',verifyToken,authPrerequisite,controller.modify)
    app.delete('/api/user/delete/:id',verifyToken,controller.deleteUser)
}
