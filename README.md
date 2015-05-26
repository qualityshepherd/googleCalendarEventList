# googleCalendarEventList
A simple Javascript script that lists the events for a public Google calendar, into an html page. 

This script:
  * Lists future calendar events with a `date - summary` and a link to the event in gcal, but is easily customizable to include whatever you want. 
  * uses the JS native `XMLHttpRequest` to perform an async call to Google's Calendar API


## USAGE:
  1. Download/Clone/Copy the script: `git clone https://github.com/qualityshepherd/googleCalendarEventList.git`
  2. Edit the `API_KEY` and `CALENDAR_ID` to match your settings
  2. Add script to your html page: `<script src="gcal.js"></script>``
  3. create a div in your html page where you want your events listed, with an id 'cal': `<div id="cal">`
  4. Profit?


## Output:
The script in it's current form will output something like the following:
```
	2015-06-20 - The BriarPickers - Private Wedding - Madison, WI
	2015-07-29 - The BriarPickers - Whole Foods Burgers & Bluegrass - Madison
	2015-07-04 - The BriarPickers - Hilldale Farmers Market - Madison
	2015-08-01 - The Bluegrass Cavaliers - Private Wedding - Eagle WI
	2015-08-02 - The BriarPickers w/ Steve Rosen - Old-Time Dance - Madison, WI
```