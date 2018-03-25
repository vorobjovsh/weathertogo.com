let weather = {
        now: {
          icon: '',
          temperature: '',
          description: ''
        },
        today: {
          header: {},
          body: []
        },
        tomorrow: {
          header: {},
          body: []
        },
        weekend: {
          saturday: {
            header: {},
            body: []
          },
          sunday: {
            header: {},
            body: []
            }
          }
        }

// Загружаем погоду в Киеве (по умолчанию)
getWeather(50.4501, 30.523400000000038, 'ru');

function getWeather(lat, lng, lang) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {

      function Header(time) {
        let date = getDate(time);
        this.weekday = date.toLocaleString(lang, {weekday: 'long'});
        this.date = date.toLocaleString(lang, {day: '2-digit', month: 'long', year: 'numeric'});
      }

      function WeatherStr(title, icon, precipType, temperature, description) {
        this.title = title;
        this.icon = icon;
        this.precipType = precipType;
        if(temperature > 0) {
           this.temperature = '+' + Math.round(temperature);
        } else {
           this.temperature = Math.round(temperature);
        }

        this.description = description;
      }

      //console.log(JSON.parse(this.responseText));
      var myWeather = JSON.parse(this.responseText);

      // погода сейчас
      weather.now.icon = myWeather.currently.icon;
      weather.now.description = myWeather.currently.summary;
      if(myWeather.currently.temperature > 0) {
         weather.now.temperature = `+${Math.round(myWeather.currently.temperature)}`;
      } else {
         weather.now.temperature = Math.round(myWeather.currently.temperature);
      }

      // погода сегодня
      const nextDayIndex = 24 - getDate(myWeather.hourly.data[0].time).getHours();
      weather.today.header = new Header(myWeather.hourly.data[0].time);
      const srcArrToday = myWeather.hourly.data.slice(0, nextDayIndex);
      srcArrToday.forEach((el, i) => weather.today.body[i] = new WeatherStr(getDate(el.time).toLocaleString(lang, {hour: '2-digit', minute: '2-digit'}), el.icon, el.precipType, Math.round(el.temperature), el.summary));

      // погода завтра
      weather.tomorrow.header = new Header(myWeather.hourly.data[nextDayIndex].time);
      const srcArrTomorrow = myWeather.hourly.data.slice(nextDayIndex, nextDayIndex + 25);
      const nightPeriod = srcArrTomorrow[2];
      const morningPeriod = srcArrTomorrow[8];
      const dayPeriod = srcArrTomorrow[14];
      const eveningPeriod = srcArrTomorrow[20];
      const srcArrTomorrowLite = [nightPeriod, morningPeriod, dayPeriod, eveningPeriod];
      const periods = ['Ночь', 'Утро', 'День', 'Вечер'];
      srcArrTomorrowLite.forEach((el, i) => weather.tomorrow.body[i] = new WeatherStr(periods[i], el.icon, el.precipType, Math.round(el.temperature), el.summary));
      /*srcArrTomorrow.forEach((el, i) => weather.tomorrow.body[i] = new WeatherStr(getDate(el.time).toLocaleString(lang, {hour: '2-digit', minute: '2-digit'}), el.icon, el.precipType, Math.round(el.temperature), el.summary));*/

      // погода на выходные

      console.log(weather);
      console.log(srcArrTomorrow);


      // получение даты из числа в ответе API
      function getDate(time) {

        let date = new Date(1000 * time);

        return date;
      }

      // Компилируем шаблоны
       headerTemplate();
       todayHeaderTemplate()
       todayTemplate();
       tomorrowHeaderTemplate();
       tomorrowTemplate();

    } //if ends
  } //onready end
  const address = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/606d16650a24656a795100b26c1b1a3e/' + lat + ',' + lng + '?lang=ru&units=si';
  //console.log(address);
  request.open('GET', address, true);
  request.send();

    //return weather;
}
