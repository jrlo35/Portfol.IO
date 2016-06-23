var tweetController = require('./tweetController.js');

module.exports = function (app) {
    "use strict";

    app.get('/:leagueId/:userId', tweetController.getTweets);
};