/**
 * sunrise-backend
 *
 * @user llaine
 * @date 11/03/15
 */


var request = require("request"),
    utils = require("./utils");

/**
 * Creating a new SunriseCal with accessToken properties.
 * @param accessToken
 * @constructor
 */
function SunriseCal(accessToken){
    this.accessToken = accessToken;
    this.ROUTES = require('../conf/calendar_ref_api.json');
}
/**
 * Simple utils function which add the tokenAccess at the end
 * of a Google Api route.
 * @param route
 * @returns {string}
 */
SunriseCal.prototype.tokenizeUrl = function(route){
    return route + '?access_token=' + this.accessToken;
};

/**
 *
 */
SunriseCal.prototype.getCalendar = function (cb) {
    var url = this.tokenizeUrl(this.ROUTES.CALENDAR_LIST);
    request(url, function (err, res, body) {

    });
};


module.exports = SunriseCal;



