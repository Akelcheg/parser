const orm = require('orm');
const settings = require('../config/settings');

let connection = null;

function setup(db, cb) {
    require('./car')(orm, db);
    //require('./comment')(orm, db);

    return cb(null, db);
}

module.exports = function (cb) {
    if (connection) return cb(null, connection);

    orm.connect(settings.database, function (err, db) {
        if (err) return cb(err);

        connection = db;
        db.settings.set('instance.returnAllErrors', true);
        setup(db, cb);
    });
};