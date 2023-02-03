const weekDayFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'short'});

function dateFormatter(date) {
    return `${weekDayFormatter.format(date)}, ${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`
}

const timeFormatter = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short', pattern: "{hour}:{minute}"});

function generateData () {
    const data = {};

    const today = new Date();
    const currentDate = new Date();

    if (today.getHours() > 17) {
        currentDate.setDate(today.getDate() + 1);
        today.setDate(today.getDate() + 1);
    }

    today.setHours(9);
    today.setMinutes(0);
    today.setSeconds(0);

    currentDate.setHours(9);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);

    for (let hour = 9; hour < 18; hour++) {
        currentDate.setHours(hour);
        data[timeFormatter.format(currentDate)] = {};
        for (let day = 0; day < 8; day++) {
            currentDate.setDate(today.getDate() + day);
            const dayName = dateFormatter(currentDate);
            data[timeFormatter.format(currentDate)][dayName] = {
                booked: Math.random() - 0.8 > 0,
                bookedByYou:  Math.random() - 0.96 > 0,
                value: +currentDate,
            };
        }
    }

    return data;
}