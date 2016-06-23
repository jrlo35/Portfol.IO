var userController = require('./userController.js');

module.exports = function (app) {
    "use strict";

    app.get('/', userController.getUsers);

    app.post('/', userController.newUser);

    app.post('/signin', userController.signIn);

    app.post('/forgotpw', userController.forgotpw);

    app.get('/users/:id', userController.getUserById);

    app.post('/getuser', userController.getSingleUser);

    app.post('/profileimage', userController.profileImage);

    app.post('/updateemail', userController.updateEmail);

    app.post('/updatepw', userController.updatePW);

    app.delete('/', userController.deleteUser);
};