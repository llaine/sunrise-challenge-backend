/**
 * sunrise-backend
 *
 * @user llaine
 * @date 11/03/15
 */

module.exports = (function () {
    "use strict";

    var SunriseCal = require('../modules/sunriseCal'),
        calendarInstance,
        exports = {};



    exports.getCalendar = function (req, res) {

        calendarInstance = new SunriseCal(req.query.accessToken);

        calendarInstance.getCalendar();

        res.send('ok ' + req.query.accessToken);

    };

    return exports;
})();