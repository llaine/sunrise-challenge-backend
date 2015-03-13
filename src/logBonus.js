/**
 * sunrise-backend
 *
 * @user llaine
 * @date 13/03/15
 */
// Code goes here
console.clear();

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


/*
 HTTP Request
 URL http://example.com
 Headers
 Authorization: Bearer oauth-token
 Accept: application/json
 Timeout 25s
 Response
 time: 500ms
 length: 85KB
 Parsing event [id:1]
 No title
 3 attendees
 Parsing event [id:2]
 Title: "Lunch"
 0 attendees
 */

String.prototype.repeat = function(){
    return new Array(arguments[0] + 1).join(this);
};

logs.map(function(value, index, array) {
    var currentValueArray = value.split(' ');

    /* Previous values */
    var previousValue = array[index-1];
    var previousValArray = previousValue ? previousValue.split(' ') : null;

    /* e: value, i : index, a : array */
    words = currentValueArray.map(function(e, i, a){
        console.log(a);
        var valueToBeReturned;
        var tab = " ".repeat(i);
        /* The same word appear between */
        if(previousValue){
            console.log(previousValue);
            valueToBeReturned = previousValArray[i] !== e ? e : tab;
        }else{
            /* First row, returning the content */
            valueToBeReturned = e;
        }
        return valueToBeReturned;
    }).join(" ");
    //console.log(words);
});