/**
 * sunrise-backend
 *
 * @user llaine
 * @date 12/03/15
 */


var assert = require('assert');
/* Module for testing API */
var request = require('supertest');

var calendarRepo = require('../../src/rest/calendar');
var urlRepo = "";

describe('/src/rest/calendar : Repository', function () {

    describe('Composition', function () {
        it('Should have two functions', function () {
            assert.equal(typeof calendarRepo, 'object');
            assert.equal(typeof calendarRepo.getCalendar, 'function');
            assert.equal(typeof calendarRepo.getEventsForCalendar, 'function');
        });
    });
});