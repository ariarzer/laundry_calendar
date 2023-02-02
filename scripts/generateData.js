function generateData () {
    const data = {};
    const dateFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'short', month: 'numeric', day: 'numeric' });
    const timeFormatter = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short', pattern: "{hour}:{minute}"});

    const today = new Date();
    today.setHours(9);
    today.setMinutes(0);
    today.setSeconds(0);

    const currentDate = new Date();
    currentDate.setHours(9);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    for (let hour = 9; hour < 18; hour++) {
        currentDate.setHours(hour);
        data[timeFormatter.format(currentDate)] = {};
        for (let day = 0; day < 7; day++) {
            currentDate.setDate(today.getDate() + day);
            const dayName = dateFormatter.format(currentDate);
            data[timeFormatter.format(currentDate)][dayName] = {
                booked: Math.random() - 0.8 > 0,
                value: currentDate,
            };
        }
    }

    return data;
}