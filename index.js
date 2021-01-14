/**
 * Module dependencies.
 */

var app = require("./app");

/**
 * Get port from environment and store in Express.
 */

var port = 3000;
app.set("port", port);

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port);
