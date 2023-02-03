const data = generateData();

const calendarElem = document.getElementById('calendar');
calendarElem.innerHTML = '';

calendarElem.appendChild(generateCalendar(data,));

iniLogic();
