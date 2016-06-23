var watchlistController = require('./watchlistController.js');

module.exports = function (app) {
	
    "use strict";

    app.post('/', watchlistController.addToWatchlist);

    app.get('/:userid', watchlistController.getWatchlist);

    app.post('/array', watchlistController.updateWatchlist);

    app.post('/remove', watchlistController.removeFromWatchlist);
};