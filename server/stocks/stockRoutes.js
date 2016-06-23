var stockController = require('./stockController.js');
var Auth = require('./../config/auth.js');

module.exports = function (app) {

    "use strict";

    app.get('/:stockName', Auth.authorize, stockController.getStock);

    app.get('/searchbar/:stockName', Auth.authorize, stockController.searchBar);

};