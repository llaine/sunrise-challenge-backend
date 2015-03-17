/**
 * sunrise-backend
 * Server file.
 *
 * Expose the URL for the API.
 *
 * /authenticate : oauth logging.
 * /authenticate/callback : Give you the accessToken (copy paste the token and add it to all the routes below as a GET params).
 *
 * /calendars?accessToken=token : Return all the calendars from the account which has been in oauth.
 * /calendars/:calendarId/events?accessToken=token : Return all the events from a particular calendar.
 *
 * @user llaine
 * @date 11/03/15
 */
(function () {
    'use strict';

    var express = require('express'),
        configuration = require('./configuration/general.json'),
        oauth = require('./modules/oauth'),
        calendar = require('./rest/calendar'),
        logger = require('./modules/logger'),
        app = express();


    /* First redirection */
    app.get('/', function (req, res) {
        res.redirect('/authenticate');
    });

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


    /**
     * This functions logs the path that has been called on the REST API,
     * check for credentials and then call the callback function.
     * @param callback
     * @returns {Function}
     */
    function log_rest(callback){
        return function (req, res, next) {
            /* Logging all action. */
            logger.log(req, "Method " + req.method + " on resource " + req.url);
            callback.call(null, req, res, next);
        }
    }

    module.exports = app;

})();

