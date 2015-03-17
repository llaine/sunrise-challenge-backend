/**
 * sunrise-backend
 *
 * @user llaine
 * @date 14/03/15
 */


/* Assert tools */
var assert = require('assert');

var logBonus = require("../src/logBonus");


var logs = [
    'HTTP Request',
    'HTTP Request URL http://example.com',
    'HTTP Request Headers Authorization: Bearer oauth-token',
    'HTTP Request Headers Accept: application/json',
    'HTTP Request Timeout 25s',
    'Response time: 500ms',
    'Response length: 85KB',
    'Parsing event [id:1] No title',
    'Parsing event [id:1] 3 attendees',
    'Parsing event [id:2] Title: "Lunch"',
    'Parsing event [id:2] 0 attendees'
];

var output = "HTTP Request\n   URL http://example.com\n   Headers\n      Authorization: Bearer oauth-token\n      Accept: application/json\n   Timeout 25s\nResponse\n time: 500ms\n length: 85KB\nParsing event [id:1]\n      No title\n      3 attendees\n Parsing event [id:2]\n      Title: \"Lunch\"\n      0 attendees";


describe("Log Bonus", function () {
    describe("#format()", function () {
        it('Should return the formated log as requested', function () {
            assert.deepEqual(logBonus, output);
        });
    });
});