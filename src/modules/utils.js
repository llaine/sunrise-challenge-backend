/**
 * sunrise-backend
 *
 * @user llaine
 * @date 11/03/15
 */


module.exports = (function () {
    'use strict';

    var exports = {};

    /**
     * Little string parsing in order to get the recurrence param
     * Format at input : ["RRULE:FREQ=WEEKLY;INTERVAL=1"]
     *
     * @param recFromGoogle
     * @returns String
     */
    function getRecurrency(recFromGoogle){
        if(recFromGoogle){
            return recFromGoogle[0].split(':')[1].split(';')[0];
        }
    }

    /**
     * Parsing the Google Calendar API.
     * And recreating calendars object with a specific format.
     * @param calFromGoogle
     * @returns {Array|*}
     */
    exports.formatCalendars = function (calFromGoogle) {
        if(calFromGoogle){
            var calendars = JSON.parse(calFromGoogle);
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
    };


    exports.formatEventsFromCalendar = function (eventsFromGoogle) {
        if(eventsFromGoogle){
            var events = JSON.parse(eventsFromGoogle);
            return events.items.map(function (e) {
                return {
                    id: e.id,
                    status: e.status,
                    title: e.summary,
                    start: {
                        dateTime: e.start.dateTime,
                        timezone: events.timeZone
                    },
                    end: {
                        dateTime: e.end.dateTime,
                        timezone: events.timeZone
                    },
                    location: e.location,
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
                        name: e.organizer.name,
                        emails: e.organizer.email,
                        self: e.organizer.self
                    },
                    editable: events.accessRole === "writer",
                    recurrence: e.recurrence ? getRecurrency(e.recurrence) : null
                }
            });
        }
    };

    return exports;
})();