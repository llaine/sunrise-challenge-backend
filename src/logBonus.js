/**
 * sunrise-backend BONUS Log Formating library
 *
 *
 * Take an array of string and must input one string formated.
 *
 * Output :
 *
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
 *
 *
 *
 * To the the prototype of anwsers
 * @user llaine
 * @date 13/03/15
 */

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


String.prototype.repeat = function(){
    return new Array(arguments[0] + 1).join(this);
};

/**
 * console.log(log) will return the desired output.
 *
 * @return String
 */
var log = logs.map(function(value, index, array) {
    /**
     * Main function for formatting each lines.
     * Check words between the current and the previous line,
     * format the result.
     *
     * @param currentWord : String
     * @param indexInCurrentRow : Number
     * @param arrayOfWord : Array
     * @returns {*}
     */
    function formatRow(currentWord, indexInCurrentRow, arrayOfWord){
        /* variable to store the formated row */
        var formatedRow;
        /**
         * Adds a line feed and respects the number of space at the beginning of the next line.
         *
         * @param nb
         * @return String
         **/
        function jumpAndTab(nb){
            return formatedRow + "\n" + " ".repeat(nb);
        }

        /* Avoid Range Exception */
        if(previousRow){
            /* Check if the previous value is not equals to the current value */
            formatedRow = arrayPreviousRow[indexInCurrentRow] !== currentWord ? currentWord : " ".repeat(indexInCurrentRow);
            /*
             For the event log, we want to keep the "Parsing event" string
             when the id of the event changes.
             */
            if(currentWord === "event" && arrayPreviousRow[indexInCurrentRow+1] !== arrayOfWord[indexInCurrentRow+1]){
                if(formatedRow !== "event"){
                    /* formatedRow = Parsing + " " + event */
                    formatedRow = arrayOfWord[indexInCurrentRow - 1] + " " + arrayOfWord[indexInCurrentRow];
                }
            }
        }else{
            /* First row, returning the content */
            formatedRow = currentWord;
        }

        /* Jump Line if we found Headers or Response, or match an event id */
        if(formatedRow === "Headers") return jumpAndTab(5);
        if(formatedRow === "Response") return jumpAndTab(0);
        /* Match the [id:1],  [id:2] */
        if(formatedRow.match(/\[[A-z].*[0-9]+\]/)){
            return jumpAndTab(5);
        }
        return formatedRow;
    }


    var row = value.split(' ');
    /* Previous row compared to the current index. */
    var previousRow = array[index-1];
    /* Splitting the previous STRING row in an Array. Ex : "Http Request" -> ["HTTP", "Request"] */
    var arrayPreviousRow = previousRow ? previousRow.split(' ') : null;
    /* Format the arrayRow and convert each row separate by blank space in String. */
    return row.map(formatRow).join(" ");

}).join('\n');

module.exports = log;