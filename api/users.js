/**
 * CRUD API for user management
 */
var bcryptjs = require('bcryptjs');
var router = require('express').Router();
var auth = require('../middlewares/auth');
var validateId = require('../middlewares/validateId');

// Get all users
router.get('/', auth, (req, res) => {
    req.db.get('users').find({}).then((docs) => {
        res.send(docs);
    });
});

// Get a specific user
router.get('/:id', auth, validateId, (req, res) => {
    req.db.get('users').findOne(req.params.id).then((user) => {
        if (!user) {
            // User with given ID not found
            return res.sendStatus(404);
        }
        res.send(user);
    });
});

// Create an user
router.post('/', auth, function(req, res) {
    var user = req.body;
    if (!user || !user.name || !user.pass) {
        return res.sendStatus(400);
    }
    user.pass = bcryptjs.hashSync(user.pass);
    // Check whether username is in use
    var users = req.db.get('users');
    users.count({ name: user.name}).then((count) => {
        if (count > 0) {
            return res.sendStatus(409); // Conflict
        }
        users.insert(user).then((insertedUser) => {
            res.send(insertedUser);
        });
    });
});

// Update an user
router.put('/:id', auth, validateId, function(req, res) {
    var user = req.body;
    if (!user) {
        return res.sendStatus(400);
    }
    if (user.pass) {
        user.pass = bcryptjs.hashSync(user.pass);
    }
    req.db.get('users').findOneAndUpdate(req.params.id, { $set: user }).then((updatedUser) => { // https://docs.mongodb.com/manual/reference/operator/update/set/
        if (!updatedUser || updatedUser.lastErrorObject) {
            // User with given ID not found
            return res.sendStatus(404);
        }
        res.send(updatedUser);
    });
});

// Delete an user
router.delete('/:id', auth, validateId, function(req, res) {
    req.db.get('users').remove(req.params.id).then((result) => {
        if (result.result.n < 1) {
            return res.sendStatus(404);
        }
        res.sendStatus(204); // https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.7, https://tools.ietf.org/html/rfc7231#section-6.3.5
    });
});

module.exports = router;
