/**
 * sunrise-backend
 *
 *
 *
 * SunriseCal : This object is the proxy, which get the infos to the Google Calendar API
 * format them and return them as a Resource.
 *
 * @user llaine
 * @date 11/03/15
 */


var request = require("request"),
    calendarUtil = require("./utils");


/* Contansts */
var PATH_TO_ROUTING = "../configuration/calendar_ref_api.json";



/**
 * Creating a new SunriseCal with accessToken properties.
 * @param accessToken
 * @constructor
 */
function SunriseCal(accessToken){
    this.accessToken = accessToken;
    this.ROUTES = require(PATH_TO_ROUTING);
}
/**
 * Simple utils function which add the tokenAccess at the end
 * of a Google Api route.
 * @param route
 * @returns {string}
 */
SunriseCal.prototype.tokenizeUrl = function(route) {
    if(route){
        return route + '?access_token=' + this.accessToken;
    }
};

/**
 * Format the route in order to put the calendarId params and
 * add the accessToken GET params at the end.
 * @param calendarId
 * @returns {string}
 */
SunriseCal.prototype.formatRouteEvents = function (calendarId) {
    if(calendarId){
        return this.tokenizeUrl(this.ROUTES.EVENT_LIST_FOR_CAL + calendarId + '/events');
    }
};


/**
 * Getting calendar from the Google API, formatting the object and passing them to a high level
 * callback function.
 * @param cb
 */
SunriseCal.prototype.getCalendar = function (cb) {
    var url = this.tokenizeUrl(this.ROUTES.CALENDAR_LIST);
    /* Fetching the calendar list */
    request(url, function (err, res, body) {
        handleResponse(err,
            /* When everyhing is fine */
            function () {
                /*
                 Formating the calendar list according to sunrise's format.
                 and returing the content in callback.
                 Passing null to the error params, because an other callback
                 is here for that.
                 */
                cb(null, calendarUtil.formatCalendars(body));
            },
            /* Something went wrong! */
            function (error) {
                cb(error, null)
            }
        );
    });
};

/**
 * Getting the events from a calendar, formatting them and passing the result
 * to a higher level function with a callback.
 * @param calendarId
 * @param cb
 */
SunriseCal.prototype.getEventsFromCal = function (calendarId, cb) {
    if(calendarId){
        /* formating the route with the calendarId params and accessToken. */
        var url = this.formatRouteEvents(calendarId);
        request(url, function (err, res, body) {
            handleResponse(err,
                /* 200 */
                function () {
                    /* Passing the result without errors */
                    cb(null, calendarUtil.formatEventsFromCalendar(body));
                },
                /* An error occured */
                function (error) {
                    /* An error occurred and no resuuult */
                    cb(error, null);
                }
            );
        });
    }
};


function handleResponse(err, cbOk, cbError){
    if(err){
        cbError(err.error.code);
    }else{
        cbOk();
    }
}

module.exports = SunriseCal;



