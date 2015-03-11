/**
 * sunrise-backend
 *
 * @user llaine
 * @date 11/03/15
 */



(function () {

    'use strict';

    var express = require('express'),
        oauth = require('./modules/oauth'),
        calendar = require('./rest/calendar'),
        app = express();

    /* oauth authentification routes. */
    app.get('/authenticate', oauth.getAuthorizeUrl);
    app.get('/authenticate/callback', oauth.grantAcces);

    /* calendar routes.  */
    app.get('/calendars', calendar.getCalendar);




    app.listen(3000, function () {
        console.log('Server listinning to %s ', 3000);
    })


    
})();