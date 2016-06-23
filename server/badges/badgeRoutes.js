var badgeController = require('./badgeController.js');

module.exports = function (app) {

    "use strict";
    app.post('/getBadges/', badgeController.getBadges);

    app.post('/possibleBadges/', badgeController.possibleBadges);

    app.post('/', badgeController.postBadge);

};
