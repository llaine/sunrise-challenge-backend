/**
 * sunrise-backend
 *
 * @user llaine
 * @date 11/03/15
 */
module.exports = (function () {
    "use strict";

    // Import request to simplify proxying
    var exports = {};

    /* Constant */

    var DEBUG = true;

    /**
     * The main logging function
     * modified using JavaSCript Ninja tip
     */
    exports.log = function () {
        if(DEBUG){

            if(typeof arguments[0] === "string") {
                arguments[0] = "[" + formatDate(new Date()) + "] " + arguments[0];
            } else {
                /* Assume the parameter is a request */
                arguments[0] = "[" + formatDate(new Date()) + " from " + arguments[0].connection.remoteAddress + "] " + arguments[1];
                arguments[1] = "";
            }
            try {
                /* Try first the most common logging method */
                console.log.apply(console, arguments);
            } catch (e) {
                try {
                    /* try to log using opera function */
                    opera.postError.apply(opera, arguments);
                } catch (e) {
                    /* if everything else failed, then use old school alerts to log */
                    alert(Array.prototype.join.call(arguments, " "));
                }
            }
        }
    };

    /**
     * Log the error in the console.
     */
    exports.error = function () {
        if(DEBUG){
            if(arguments[0]){
                arguments[0] = '[' + formatDate(new Date()) + '] ERROR ' + arguments[0] + '\n';
                console.error.apply(console, arguments);
            }
        }
    };

    /**
     * The date format must be done by hand
     * @param d
     * @returns {string}
     */
    function formatDate(d) {
        var dd = d.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = d.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = d.getFullYear();

        var hh = d.getHours();
        if (hh < 10) hh = '0' + hh;

        var MM = d.getMinutes();
        if (MM < 10) MM = '0' + MM;

        var ss = d.getSeconds();
        if (ss < 10) ss = '0' + ss;

        return dd + '-' + mm + '-' + yy + ' ' + hh + ':' + MM + ":" + ss + "-" + d.getMilliseconds();
    }

    return exports;
})();
