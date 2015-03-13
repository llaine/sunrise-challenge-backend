/**
 * sunrise-backend
 *
 * @user llaine
 * @date 12/03/15
 */


/* Assert tools */
var assert = require('assert');
/* The module we are going to test */
var utils = require('../../src/modules/utils');


/* Mock data for the test */
var mockDataForCalendar = require('./mock/calendars.json');
var mockDataForEvents = require('./mock/events.json');
var mockFormatedDataForEvents = require('./mock/eventsFormated.json');
var mockFormatedDataForCalendars = require('./mock/calendarsFormated.json');

var mockRecurrenceWeekly   = ["RRULE:FREQ=WEEKLY;INTERVAL=1"],
    mockReccurenceDaily    = ["RRULE:FREQ=DAILY;INTERVAL=1"],
    mockReccurenceMonthly  = ["RRULE:FREQ=MONTHLY;INTERVAL=1"],
    mockReccurenceYearly   = ["RRULE:FREQ=YEARLY;INTERVAL=1"],
    mockReccurenceMinutely = ["RRULE:FREQ=MINUTELY;INTERVAL=1"];


describe('src/modules/utils : The utils object', function () {

    /* Object composition */
    describe('The object is composed by 3 functions', function () {
        assert.equal(typeof utils, 'object');

        it('Should have a formatCalendars function', function () {
            assert.equal(typeof utils.formatCalendars, 'function')
        });

        it('Should have a formatEventsFromCalendar function', function () {
            assert.equal(typeof utils.formatEventsFromCalendar, 'function');
        });

        it('Should have a getCurrency function', function () {
            assert.equal(typeof utils.getRecurrence, 'function');
        });
    });

    /* The getReccurence function */
    describe('getRecurrence function', function () {

        it('Shoud return the currency in a specific format', function () {
            /* White box tests */
            assert.equal(utils.getRecurrence(), null);
            assert.equal(utils.getRecurrence({}), null);
            assert.equal(utils.getRecurrence([]), null);
            assert.equal(utils.getRecurrence([""]), null);
            assert.equal(utils.getRecurrence([":;"]), null);

            assert.equal(utils.getRecurrence(mockRecurrenceWeekly), "FREQ=WEEKLY");
            assert.equal(utils.getRecurrence(mockReccurenceDaily), "FREQ=DAILY");
            assert.equal(utils.getRecurrence(mockReccurenceMonthly), "FREQ=MONTHLY");
            assert.equal(utils.getRecurrence(mockReccurenceYearly), "FREQ=YEARLY");
            assert.equal(utils.getRecurrence(mockReccurenceMinutely), "FREQ=MINUTELY");
        });

    });

    describe('formatCalendar function', function () {

        describe('In case of wrong params', function () {
            it('Shoud return null', function () {
                assert.equal(utils.formatCalendars(), null);
                assert.equal(utils.formatCalendars(""), null);
                assert.equal(utils.formatCalendars("Hello World"), null);
                assert.equal(utils.formatCalendars('{"items":[]}'), null);
                /* if JSON params are given */
                assert.equal(utils.formatCalendars(mockDataForCalendar), null);
            });
        });

        describe('With mock data', function () {
            it('Shoud return the calendar formated', function (done) {
                /* The function take String in entry  */
                mockDataForCalendar = JSON.stringify(mockDataForCalendar);
                assert.deepEqual(utils.formatCalendars(mockDataForCalendar), mockFormatedDataForCalendars);
                done();
            });
        });
    });

    describe("formatEventsFromCalendar function", function () {
        describe('In case of wrong params', function () {
            it('Should return null', function () {
                assert.equal(utils.formatEventsFromCalendar(), null);
                assert.equal(utils.formatEventsFromCalendar(""), null);
                assert.equal(utils.formatEventsFromCalendar("Hello World"), null);
                assert.equal(utils.formatEventsFromCalendar('{"items":[]}'), null);

                assert.equal(utils.formatEventsFromCalendar(mockDataForEvents), null);
            })
        });


        describe("With mock data from json file", function () {
            it('Should the events formated', function (done) {
                /* I arbitrarily picked an existing calendar */
                assert.deepEqual(utils.formatEventsFromCalendar(JSON.stringify(mockDataForEvents)), mockFormatedDataForEvents);
                done();
            });
        });
    });
});