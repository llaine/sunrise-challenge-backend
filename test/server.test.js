/**
 * sunrise-backend
 *
 * @user llaine
 * @date 15/03/15
 */


'use strict';


var assert = require('assert');
/* Module for testing API */
var request = require('supertest');

var server = require('../src/server');

var accessToken = "ya29.OQE3-DVrt8KEgKHL1cUWp0Ih_9mGNghYrWBHH2L2fYFoPJRY5t9s3AdEwJaJoeoTjUo8KNYQgUxIuA";
var calendarId = "obpquhnteak3ou309nm9mtfeicclb5l8@import.calendar.google.com";


describe('Express server', function () {

     describe('Without accessToken', function () {
         it('Should return 401 when /calendar', function (done) {
            request(server)
                .get('/calendars')
                .expect(401)
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    assert.equal(res.text, "Unauthorized");
                    done();
                })
         });

        it('Should return 401 when /calendar/:id/events', function (done) {
            request(server)
                .get('/calendars/test/events')
                .expect(401)
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    assert.equal(res.text, "Unauthorized");
                    done();
                });
        });
     });
    
    describe('With access token', function () {
        it('Should GET calendars', function (done) {
            request(server)
                .get('/calendars?accessToken=' + accessToken)
                .expect(200)
                .end(function (err, res) {
                    var calendars = JSON.parse(res.text);

                    assert.equal(err, null);
                    assert.equal(calendars.length, 5);

                    done();
                });
        });

        it('Should GET events from a calendar', function (done) {
            request(server)
                .get('/calendars/'+calendarId+'/events?accessToken=' + accessToken)
                .expect(200)
                .end(function (err, res) {
                    var events = JSON.parse(res.text);

                    assert.equal(err, null);
                    assert.equal(events.length, 112);

                    done();
                });
        });
    })
});
