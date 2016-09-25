/**
 * Middleware which extracts the basic authentication data from the request
 * and puts it into the req.user {name, pass} object.
 * Used via app.use(extractauth).
 * The authentication itself is done in the api calls with router.get(..., auth, ...)
 */

module.exports = (req, res, next) => {
    req.user = require('basic-auth')(req); // https://github.com/jshttp/basic-auth
    next();
};