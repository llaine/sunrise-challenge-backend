/**
 * sunrise-backend
 *
 * @user llaine
 * @date 12/03/15
 */

/* Assert tools */
var assert = require('assert');

/* The module we are going to test */
var SunriseCal = require('../../src/modules/sunriseCal');


/* Mock data */
var mockFormatedDataForEvents = require('./mock/eventsFormated.json'),
    mockFormatedDataForCalendars = require('./mock/calendarsFormated.json'),
    mockRoutes = {
        "CALENDAR_LIST" : "https://www.googleapis.com/calendar/v3/users/me/calendarList/",
        "EVENT_LIST_FOR_CAL": "https://www.googleapis.com/calendar/v3/calendars/"
    },
    mockToken = "token",
    mockObject = new SunriseCal(mockToken);


var accessToken = "ya29.OQE3-DVrt8KEgKHL1cUWp0Ih_9mGNghYrWBHH2L2fYFoPJRY5t9s3AdEwJaJoeoTjUo8KNYQgUxIuA";


describe('src/modules/sunriseCal : SunriseCalendar object', function () {

    describe('Constructor', function () {
        it('Should 2 default properties and 4 functions', function () {
            assert.equal(typeof SunriseCal, "function");
            assert.equal(typeof mockObject, "object");
            assert.equal(mockObject.accessToken, mockToken);
            assert.deepEqual(mockObject.ROUTES, mockRoutes);

            assert.equal(typeof mockObject.tokenizeUrl, "function");
            assert.equal(typeof mockObject.formatRouteEvents, "function");
            assert.equal(typeof mockObject.getCalendar, "function");
            assert.equal(typeof mockObject.getEventsFromCal, "function");

        });
    });

    describe("#tokenizeUrl()", function () {
        it('Should return null in case of wrong params', function () {
            assert.equal(mockObject.tokenizeUrl(), null);
        });

        it('Should return a path with token as GET parameters', function () {
            assert.equal(
                mockObject.tokenizeUrl(mockRoutes.CALENDAR_LIST),
                mockRoutes.CALENDAR_LIST + "?access_token=" + mockToken
            );
        });
    });


    describe('#formatRouteEvents()', function () {
        it('Should return null in case of wrong params', function () {
            assert.equal(mockObject.formatRouteEvents(), null);
        });

        it('Should return a route with calendarId in params and token as GET Param', function () {
            var calendarId = mockFormatedDataForCalendars[1].id;
            assert.equal(
                mockObject.formatRouteEvents(calendarId),
                mockRoutes.EVENT_LIST_FOR_CAL + calendarId + "/events?access_token=" + mockToken
            );
        });
    });


    describe('#getCalendar()', function () {
        var mockSunriseCal = new SunriseCal();
        it('Should return null in case of missing token', function (done) {
            mockSunriseCal.getCalendar(function (err, cal) {
                assert.equal(err, null);
                assert.equal(cal, null);
                done();
            });
        });

        var mockSunriseCalTwo = new SunriseCal("toto");

        it('Should return null in case of wrong token', function (done) {
            mockSunriseCalTwo.getCalendar(function (err, cal) {
                assert.equal(err, null);
                assert.equal(cal, null);
                done();
            });
        });
    });

    describe('#getEventsFromCal()', function () {
        var mockSunriseCal = new SunriseCal();
        it('Should return null in case of missing token', function (done) {
            var calendarId = mockFormatedDataForCalendars[1].id;
            mockSunriseCal.getEventsFromCal(calendarId, function (err, cal) {
                assert.equal(err, null);
                assert.equal(cal, null);
                done();
            });
        });

        var mockSunriseCalTwo = new SunriseCal("toto");

        it('Should return null in case of wrong token', function (done) {
            var calendarId = mockFormatedDataForCalendars[1].id;
            mockSunriseCalTwo.getEventsFromCal(calendarId, function (err, cal) {
                assert.equal(err, null);
                assert.equal(cal, null);
                done();
            });
        });
    });
});