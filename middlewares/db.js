/**
 * Middleware that opens a database connection and provides it as db in the request.
 */
var db = require('monk')('localhost/db');
var bcryptjs = require('bcryptjs');

// Handles requests in app handler chain and provides a database connection in req.db
module.exports = (req, res, next) => {
    req.db = db; // http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
    next();
};

// Called in app.js to create an admin user if it does not exist
module.exports.init = () => {
    var users = db.get('users');
    users.count({ name: 'admin'}).then((count) => {
        if (count < 1) {
            users.insert({ 
                name: 'admin',
                pass: bcryptjs.hashSync('admin')
            });
        }
    });
}