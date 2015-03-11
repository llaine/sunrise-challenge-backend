/**
 * sunrise-backend
 *
 * @user llaine
 * @date 11/03/15
 */
(function () {
    'use strict';

    var express = require('express'),
        configuration = require('./conf/general.json'),
        oauth = require('./modules/oauth'),
        calendar = require('./rest/calendar'),
        logger = require('./modules/logger'),
        app = express();


    /* oauth authentification routes. */
    app.get('/authenticate', log_rest(oauth.getAuthorizeUrl));
    app.get('/authenticate/callback', log_rest(oauth.grantAcces));

    /* calendar route.  */
    app.get('/calendars', log_rest(calendar.getCalendar));
    /* events route */
    app.get('/calendars/:calendarId/events', log_rest(calendar.getEventsForCalendar));


    app.listen(configuration.server_port, function () {
        logger.log("%s Listening at %s", configuration.server_name, configuration.server_port);
    });

    function checkCredentials(req, res){
        if(!req.query.accessToken){
            res.redirect('/authenticate');
        }
    }

    /**
     * This functions logs the path that has been called on the REST API,
     * check for credentials and then call the callback function.
     * @param callback
     * @returns {Function}
     */
    function log_rest(callback){
        return function (req, res, next) {
            /* Security check for every route.  */
            checkCredentials(req, res);
            /* Logging all action. */
            logger.log(req, "Method " + req.method + " on resource " + req.url);
            callback.call(null, req, res, next);
        }
    }
})();