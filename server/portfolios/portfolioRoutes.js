var portfolioController = require('./portfolioController.js');
var Auth = require('./../config/auth.js');

module.exports = function (app) {

    "use strict";

  // gets all the stocks in a users portfolio

    app.get('/stocks/:leagueId/:userId', portfolioController.getUserStocks);

    app.put('/stocks/:leagueId/:userId', portfolioController.updateUserStocks);

  // gets users portfolio basic info
    app.get('/:leagueId/:userId', Auth.authorize, portfolioController.getPortfolio);
};
