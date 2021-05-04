const API_URL = "https://api.pray.zone/v2/times/today.json?city=casablanca&key=MagicKey";
HTML = '';
async function TIME_PRAYER() {
    const response = await fetch(API_URL);
    const json = await response.json();
	HTML = place_today(json.results.location, json.results.datetime[0].date.gregorian);
	timePrayers(json.results.datetime[0].times);
}
function place_today(loc,dt){
	city = loc.city
	country = loc.country
	date = new Date(dt);
	return `<li class="time-prayer loc-dt">
			<div class="loc">${city}, ${country}</div>
			<div class="dt">${date.toDateString()}</div>
		</li>`;
}

function timePrayers(times_prayers){
	times = Object.values(times_prayers);
	prayers = Object.keys(times_prayers);
	for (var i = 0; i < times.length; i++) {
		if([2,3,4,6,7].includes(i)){
			HTML += timePrayer(times[i], prayers[i])
		}
	}
	document.querySelector('.Prayer-Times').innerHTML = HTML;
}
TIME_PRAYER();
function timePrayer(time,prayer){
	return `<li class="time-prayer">
			<div class="time">${time}</div>
			<div class="prayer">${prayer}</div>
		</li>`;
}
