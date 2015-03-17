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
     * @param req
     * @param res
     * @returns {SunriseCal}
     */
    function getInstance(req){
        if(req.query.accessToken){
            return new Sunrise(req.query.accessToken);
        }
    }


    function checkCredentials(req, res){
        if(!req.query.accessToken){
            logger.log('Unauthorized access to %s from %s', req.method, req.url);
            res.sendStatus(401);
        }
    }

    /**
     * Simple function to handle-error from the Google Calendar API
     * @param errCode
     * @param req
     * @param res
     */
    function handleError(errCode, req, res){
        logger.error('%s occured on %s -> %s', errCode, req.method, req.url);
        res.sendStatus(errCode);
        res.end();
    }

    /**
     * GET / Calendar
     * Get all calendar resources.
     * @param req
     * @param res
     */
    exports.getCalendar = function (req, res) {
        checkCredentials(req, res);

        SunriseCal = getInstance(req);

        if(SunriseCal){
            SunriseCal.getCalendar(function (err, calendars) {
                if(err){
                    handleError(err, req, res);
                    /* Returning because the headers have already been sent */
                    return;
                }
                res.send(calendars);
            });
        }
    };


    /**
     * GET / Events
     * Get all Events resource from a specific Calendars resource.
     * @param req
     * @param res
     */
    exports.getEventsForCalendar = function (req, res) {
        checkCredentials(req, res);

        SunriseCal = getInstance(req);

        if(SunriseCal){

            SunriseCal.getEventsFromCal(req.params.calendarId, function (err, events) {
                if(err){
                    handleError(err, req, res);
                    /* Returning because the headers have already been sent */
                    return;
                }
                res.send(events);
            });
        }
    };

    return exports;
})();