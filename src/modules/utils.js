/**
 * sunrise-backend
 *
 * @user llaine
 * @date 11/03/15
 */


module.exports = (function () {
    'use strict';

    var exports = {},
        logger = require('./logger');

    /**
     * Little string parsing in order to get the recurrence param
     * Format at input : ["RRULE:FREQ=WEEKLY;INTERVAL=1"]
     *
     * @param recFromGoogle : Array
     * @returns String
     */
    exports.getRecurrence = function (recFromGoogle){
        if(recFromGoogle
            && typeof recFromGoogle === "object"
            && Object.keys(recFromGoogle).length > 0)
        {
            /* Deep comparaison */
            if(recFromGoogle[0]){
                /* Splitting (delimiter is a :) the string in array of two item */
                var recurrenceArray = recFromGoogle[0].split(':');
                /* Getting the FREQ=X */
                if(recurrenceArray[1]){
                    var FREQ = recurrenceArray[1].split(';')[0];
                    /* If the FREQ is not empty returning */
                    if(FREQ){
                        return FREQ;
                    }
                }
            }
        }
    };

    /**
     * Parsing the Google Calendar API.
     * And recreating calendars object with a specific format.
     * @param calFromGoogle Plain string
     * @returns {Array|*}
     */
    exports.formatCalendars = function (calFromGoogle) {
        if(calFromGoogle){
            try {
                var calendars = JSON.parse(calFromGoogle);
                if(calendars.items.length > 0){
                    return calendars.items.map(function (e) {
                        return {
                            id: e.id,
                            title: e.summary,
                            color: e.backgroundColor,
                            writable: e.accessRole === 'reader',
                            selected: e.selected || false,
                            timezone: e.timeZone
                        };
                    });
                }

            } catch(e){
                logger.error(e);
            }
        }
    };

    /**
     * Format the events from the Google Calendar API.
     * Just looping thru the events.items Array and recreating a specific
     * Array with the needed informations.
     *
     * @param eventsFromGoogle
     * @returns {Array|*}
     */
    exports.formatEventsFromCalendar = function (eventsFromGoogle) {
        if(eventsFromGoogle){
            try {
                var events = JSON.parse(eventsFromGoogle);
                /* Checking if the items are not empty */
                if(events.items.length > 0){
                    return events.items.map(function (e) {
                        var formatedEvent =  {
                            id: e.id,
                            status: e.status,
                            title: e.summary,
                            start: {
                                timezone: events.timeZone
                            },
                            end: {
                                timezone: events.timeZone
                            },
                            /* If the are not attendees, filling with an empty array. */
                            attendees: e.attendees === undefined ? []
                                /* If there are attendees, then creating new array from the data. */
                                : e.attendees.map(function (attendee) {
                                return {
                                    name: attendee.displayName,
                                    emails: attendee.email,
                                    self: attendee.self,
                                    rsvpStatus: attendee.responseStatus
                                }
                            }),
                            organizer: {
                                name: e.organizer.displayName,
                                emails: e.organizer.email,
                                self: e.organizer.self
                            },
                            editable: events.accessRole === "writer",
                        };

                        /* Fields which can be empty */
                        if(e.location){ formatedEvent.location = e.location; }
                        if(e.recurrence){ formatedEvent.reccurence = exports.getRecurrence(e.recurrence); }
                        if(e.start.dateTime){ formatedEvent.start.dateTime = e.start.dateTime }
                        if(e.end.dateTime){ formatedEvent.end.dateTime = e.end.dateTime }

                        return formatedEvent;
                    });
                }
            }catch(e){
                logger.error(e);
            }
        }
    };

    return exports;
})();