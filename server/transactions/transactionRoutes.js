var transactionController = require('./transactionController.js');

module.exports = function (app) {

    "use strict";

    app.post('/', transactionController.buySell);

    app.post('/limitorder', transactionController.limitOrder);

    app.post('/getorders', transactionController.getOrders);

    app.post('/cancelorder', transactionController.cancelOrder);

};
