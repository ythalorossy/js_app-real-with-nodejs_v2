exports.notFound = function (req, res, next) {
    'use strict';
    res.status(404);
    res.render('not-found');
};

exports.serverError = function (error, req, res, next) {
    'use strict';
    res.status(500);
    res.render('server-error', {
        error: error
    });
};