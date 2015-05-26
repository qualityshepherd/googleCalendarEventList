/**
 * Display a list a google calendar events from a public calendar
 *
 * @author brian@qualityshepherd.com
 *
 * USAGE:
 * 1. Add script to html page: <script src="gcal.js"></script>
 * 2. create a div with id 'cal' where you want your events listed: `<div id="cal">`
 * 
 * This is shoutware; if like/use this script, give me a shout and let me know :)
 */

/**
 * A google calendar API Key
 *
 * create this api at: https: //console.developers.google.com
 */
var API_KEY = '<YOUR_API_KEY>';

/**
 * A google calendar ID
 *
 * get the id from your google calendar > settings
 */
var CALENDAR_ID = '<YOUR_CALENDAR_ID>';

/** current date object */
var now = new Date();

/**
 * Build a Google Calendar API http request 
 * {@link https://developers.google.com/google-apps/calendar/v3/reference/events}
 */
var request = 'https://www.googleapis.com/calendar/v3/calendars/' +
        CALENDAR_ID +
        '/events?fields=items(description%2Csummary%2Clocation%2Cstart%2ChtmlLink)&timeMin=' +
        getDateTimeOfNow(now) +
        '&key=' +
        API_KEY;

/**
 * add a leading zero to a number
 *
 * @param {int} num - a number (or number string)
 * @returns {string}
 */
function addZero(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

/**
 * format a date string
 *
 * @returns string - formated date string for google's api: yyyy-mm-ddTHH:MM:ss-hh:MM
 */
function getDateTimeOfNow(now) {
    var mm = addZero(now.getMonth() + 1);
    var dd = addZero(now.getDate());
    var yyyy = now.getFullYear();
    var HH = addZero(now.getHours()); // military time
    var hh = HH > 12 ? addZero(HH - 12) : HH; // 12 hour time
    var MM = addZero(now.getMinutes());
    var SS = addZero(now.getSeconds());
    return [yyyy, mm, dd].join('-') + 'T' + [HH, MM, SS].join(':') + '-' + [hh, MM].join(':');
}

/**
 * get calendar events using google's calendar api
 *
 * @param {Object} JSON object of event results
 */
function listEvents(events) {
    var calDiv = document.getElementById('cal');
    if (events.items.length > 0) {
        var date = '';
        var li = '';
        var item = '';
        var a = '';
        // build the html... 
        var ul = document.createElement('ul');
        for (var i = 0; i < events.items.length; i++) {
            item = events.items[i];
            date = (item.start.date) ? item.start.date : item.start.dateTime.split('T')[0];
            li = document.createElement('li');
            li.appendChild(document.createTextNode(date + ' - '));
            a = document.createElement('a');
            a.setAttribute('href', item.htmlLink);
            a.appendChild(document.createTextNode(item.summary));
            li.appendChild(a);
            ul.appendChild(li);
        }
        calDiv.appendChild(ul);
    } else {
        document.createTextNode('No upcoming events found...');
    }
}

/**
 * javascript native async requester...
 *
 * @param {string} request url
 * @returns {obj} json object
 */
function httpGet(url) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.onreadystatechange = function(oEvent) {
        if (oReq.readyState === 4 && oReq.status === 200) {
            // callback when we get response... 
            listEvents(JSON.parse(oReq.responseText));
        } else {
            console.log("get response: ", oReq.statusText);
        }
    };
    oReq.send();
}

// build the request, make the async call, and callback with results...
httpGet(request);