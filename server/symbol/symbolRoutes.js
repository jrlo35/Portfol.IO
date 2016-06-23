var symbolController = require('./symbolController.js');

module.exports = function (app) {
    "use strict";

    app.get('/:company', symbolController.getSymbol);

};