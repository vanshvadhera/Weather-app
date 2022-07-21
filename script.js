const timee1 = document.getElementById('time');
const datee1 = document.getElementById('date');
const currentweatheritemse1 = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countrye1 = document.getElementById('country');
const weatherforecaste1 = document.getElementById('weather-forecast');
const currenttempe1 = document.getElementById('current-temp');
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursdat', 'friday', 'saturday']
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const api = 'e7909ff1740fd84ec21a8cf7b67d23b3';
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursin12hformat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'Pm' : 'Am'

    timee1.innerHTML = hoursin12hformat + ':' + (minutes<10 ? '0'+ minutes : minutes) + ' ' + `<small class="text-capitalize" id="am-pm">${ampm}</small>`

    datee1.innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);
getweather();
function getweather() {
    navigator.geolocation.getCurrentPosition(success => {

        let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${api}`).then(res => res.json()).then(data => {
            console.log(data)
            showweather(data);
        })

    })
}
function showweather(data) {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;
    timezone.innerHTML = data.timezone;
    countrye1.innerHTML= data.lat+'N '+data.lon+'E'
    currentweatheritemse1.innerHTML =
        ` <div class="weather-iteam m-3 ">
        <p>Humidity</p>
        <p>${humidity}</p>
    </div>
    <div class="weather-iteam m-3">
        <p>Pressure</p>
        <p>${pressure}</p>
    </div>
    <div class="weather-iteam m-3">
        <p>Wind-Speed</p>
        <p>${wind_speed}</p>
    </div>
    <div class="weather-iteam m-3 ">
        <p>Sunrise</p>
        <p>${window.moment(sunrise * 1000).format('HH:MM a')}</p>
    </div>
    <div class="weather-iteam m-3">
        <p>Sunset</p>
        <p>${window.moment(sunset * 1000).format('HH:MM a')}</p>
    </div>`;
    let otherdayforcast = ''
    data.daily.forEach((day, idx) => {
        console.log(window.moment(day.dt * 1000).format('ddd'), "Day")
        if (idx == 0) {
            currenttempe1.innerHTML =`
            <div class="today" id="current-temp">
                                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" id="w-icon">
                                <p class=" card-text day card-title text-capitalize text-light">${window.moment(day.dt * 1000).format('ddd')}</p>
                                <p class=" card-text temp text-light">Night - ${day.temp.night}&#176; C</p>
                                <p class=" card-text temp text-light">Day - ${day.temp.day}&#176; C</p>
                            </div>
            `

        } else {
            otherdayforcast +=` <div class="col md">
                                    <div class="card bg-dark text-center ">
                                        <div class="weather-forecast-iteam" id="current-temp ">
                                            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" id="w-icon">
                                                <p class="card-text day card-title text-capitalize text-light">${window.moment(day.dt * 1000).format('ddd')}</p>
                                                <p class="card-text temp text-light">Night - ${day.temp.night}&#176; C</p>
                                                <p class="card-text temp text-light">Day - ${day.temp.day}&#176; C</p>
                                            </div>
                                        </div>
                                    </div>`
        }
    })

    weatherforecaste1.innerHTML = otherdayforcast;
}