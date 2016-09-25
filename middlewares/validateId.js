/**
 * Middleware for routers which checks the ID given as parameter for validity.
 * An ID for MongoDB must be either a 12 or 24 character string.
 * Used in routers as handler chain.
 */

module.exports = (req, res, next) => {
    var id = req.params.id;
    if (!id || !(id.length === 12 || id.length === 24)) {
        return res.sendStatus(400);
    }
    next();
}