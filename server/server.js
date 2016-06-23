var express = require('express');


var app = express();
var port = process.env.PORT || 3000;

require('./config/middleware.js')(app, express);

app.listen(port, function () {
    "use strict";
    console.log('Connected to port: ' + port);
});

module.exports = app;
