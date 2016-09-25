/**
 * Middleware for routers which checks the user credentials and access permissions.
 * Used in routers as handler chain.
 */

function sendUnauthorized(res) {
    // http://stackoverflow.com/a/23616372
    res.status(401).set('WWW-Authenticate', 'Basic').end();
}

module.exports = (req, res, next) => {
    var user = req.user;
    // Check whether credentials are given
    if (!user || !user.name || !user.pass) {
        return sendUnauthorized(res);
    }
    // Check user against database
    var users = req.db.get('users');
    users.findOne({ name: user.name }).then((userInDatabase) => {
        if (!userInDatabase) {
            return sendUnauthorized(res);
        }
        // Check user permissions to URL
        // TODO
        // User has permission, continue in handler chain
        req.user = userInDatabase;
        next();
    });
}