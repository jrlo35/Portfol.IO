var analysisController = require('./analysisController.js');

module.exports = function (app) {

    "use strict";
    app.post('/', analysisController.stockdata);

    app.post('/getinfo', analysisController.getinfo);

};