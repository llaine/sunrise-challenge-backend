/**
 * sunrise-backend
 *
 * @user llaine
 * @date 12/03/15
 */

/* Assert tools */
var assert = require('assert');
/* The module we are going to test */
var utils = require('../../src/modules/sunriseCal');


/* Mock data for the test, those from the google API */
var mockDataForCalendar = require('./mock/calendars.json');
var mockDataForEvents = require('./mock/events.json');
/* Mock data formated, which should be returned */
var mockFormatedDataForEvents = require('./mock/eventsFormated.json');
var mockFormatedDataForCalendars = require('./mock/calendarsFormated.json');



describe('src/modules/sunriseCal : SunriseCalendar object', function () {
    describe('Composition', function () {
        it('Should contains 4 prototyped functions', function () {

        });
    });
});