/**
 * sunrise-backend
 *
 * @user llaine
 * @date 11/03/15
 */

module.exports = (function () {
    "use strict";

    var Sunrise = require('../modules/sunriseCal'),
        SunriseCal,
        exports = {};


    function getInstance(token){
        if(!token){
            // TODO redirection unauthorize
        }
        return new Sunrise(token);
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
            res.send(calendars);
        });
    };


    exports.getEventsForCalendar = function (req, res) {
        SunriseCal = getInstance(req.query.accessToken);

        SunriseCal.getEventsFromCal(req.params.calendarId, function (events) {
            res.send(events);
        });
    };

    return exports;
})();