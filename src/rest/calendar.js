/**
 * sunrise-backend
 *
 * @user llaine
 * @date 11/03/15
 */

module.exports = (function () {
    "use strict";

    var Sunrise = require('../modules/sunriseCal'),
        logger = require('../modules/logger'),
        SunriseCal,
        exports = {};

    /**
     * Simple delegation. In case of we need to change the Implemntation
     * of Sunrise Provide with something else ...
     * @param token
     * @returns {SunriseCal}
     */
    function getInstance(token){
        return new Sunrise(token);
    }

    /**
     * Simple function to handle-error from the Google Calendar API
     * @param err
     * @param res
     */
    function handleError(err, req, res){
        logger.log('Error %s occured on %s -> %s ', err, req.method, req.url);

        res.setHeader('Access-Control-Allow-Origin', '*');
        switch(err){
            case 404:
                res.send(404);
                break;
            case 401:
                res.send(401);
                break;
            default:
                res.send(400);
                break;
        }
        res.end();
    }

    /**
     * GET / Calendar
     * Get all calendar resources.
     * @param req
     * @param res
     */
    exports.getCalendar = function (req, res) {
        SunriseCal = getInstance(req.query.accessToken);

        SunriseCal.getCalendar(function (err, calendars) {
            if(err){
                handleError(err, req, res);
            }
            res.send(calendars);
        });
    };


    /**
     * GET / Events
     * Get all Events resource from a specific Calendars resource.
     * @param req
     * @param res
     */
    exports.getEventsForCalendar = function (req, res) {
        SunriseCal = getInstance(req.query.accessToken);

        SunriseCal.getEventsFromCal(req.params.calendarId, function (err, events) {
            if(err){
                handleError(err, req, res);
            }
            res.send(events);
        });
    };

    return exports;
})();