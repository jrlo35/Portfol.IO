var leagueTransactionsController = require('./leagueTransactionsController.js');


module.exports = function (app) {
    "use strict";

    app.post('/', leagueTransactionsController.getLeagueTransactionsfromDB);

};