/**
 * sunrise-backend
 *
 * @user llaine
 * @date 11/03/15
 */
module.exports = (function () {
    'use strict';

    var oAuth = require('oauth').OAuth2,
        confOAuth = require("../conf/oauth.json"),
        instance,
        utils = require('./utils'),
        exports = {};

    /* creating oauth instance with the credentials from Google Dev Console. */
    instance = new oAuth(confOAuth.CLIENT_ID, confOAuth.CLIENT_SECRET, 'https://accounts.google.com/', 'o/oauth2/auth', 'o/oauth2/token', null);

    /**
     * Ask to the user for connection in scope's informations.
     *
     * Redirect the user to the connection url.
     *
     * @return void
     * @param req
     * @param res
     */
    exports.getAuthorizeUrl = function (req, res) {
        res.redirect(instance.getAuthorizeUrl({response_type:'code', scope: confOAuth.SCOPE, redirect_uri: confOAuth.CB_URL}));
    };

    /**
     * Getting the access token after being authorize by user.
     *
     * Resolving the accessToken with a callback, in order to get the token in high level function.
     *
     * @param req
     * @param res
     * @param cb
     */
    exports.grantAcces = function (req, res) {
        /* Getting the GET params code.  */
        var code = req.query.code,
        /* the credentials to get the code. */
            credentials = {
                client_id: confOAuth.CLIENT_ID,
                client_secret: confOAuth.CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: confOAuth.CB_URL
            };

        /* getting the token and redirecting to the calendar. */
        instance.getOAuthAccessToken(code, credentials, function (err, accessToken) {
            res.redirect('/calendars?accessToken=' + accessToken)
        });
    };


    return exports;
})();




