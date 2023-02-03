function generateInputElement(booked, value, bookedByYou, dateKey, timeKey, bookingPopup, changePopup) {
    const today = new Date();

    const inputElem = document.createElement('input');
    inputElem.type = 'radio';
    inputElem.name = 'laundry_slot';
    inputElem.value = new Date(value).getTime();
    inputElem.required = true;
    inputElem.disabled = booked || new Date(value) < today;
    inputElem.classList.add('Calendar__timeRadio');

    inputElem.setAttribute('data-bookedByYou', bookedByYou);
    inputElem.setAttribute('data-timeKey', timeKey);
    inputElem.setAttribute('data-dateKey', dateKey);

    return inputElem;
}

function generateTableHeader(dateSet) {
    const theadElem = document.createElement('thead');

    const trElem = document.createElement('tr');

    dateSet.forEach((date) => {
        const [dayName, dayDate] = date.split(',');

        const thElem = document.createElement('th');
        thElem.innerHTML = `
            <div class="Calendar__dateHead">
                <span class="Calendar__dayName">${dayName}</span>
                <span class="Calendar__dayDate">${dayDate}</span>
            </div>
        `;

        trElem.appendChild(thElem);
    })

    theadElem.appendChild(trElem);

    return theadElem;
}

function generateCalendar(data, bookingPopup, changePopup) {
    const calendarElem = document.getElementById('calendar');
    calendarElem.innerHTML = '';

    const dateSet = new Set();

    const bodyElem = document.createElement('tbody');

    Object.keys(data).forEach((timeKey) => {
        const rowElem = document.createElement('tr');
        rowElem.classList.add('Calendar__tr');

        Object.keys(data[timeKey]).forEach((dateKey) => {
            const {
                booked,
                value,
                bookedByYou
            } = data[timeKey][dateKey];

            dateSet.add(dateKey);

            const tdElem = document.createElement('td');
            tdElem.classList.add('Calendar__td');

            const labelElem = document.createElement('label');
            labelElem.classList.add('Calendar__timeSlot');
            if (bookedByYou) {
                labelElem.classList.add('Calendar__timeSlot--bookedByYou');
            }

            labelElem.appendChild(generateInputElement( booked, value, bookedByYou, dateKey, timeKey, bookingPopup, changePopup ));

            const [hours, minutes] = timeKey.split(':');

            const labelTextElem = document.createElement('span');
            labelTextElem.classList.add('Calendar__timeLabel');

            labelTextElem.innerHTML = `
                <span class="Calendar__timeLabel--Hours">${hours}</span>
                <span class="Calendar__timeLabel--Minutes">${minutes}</span>
            `;

            labelElem.appendChild(labelTextElem);
            tdElem.appendChild(labelElem);
            rowElem.appendChild(tdElem);
        })

        bodyElem.appendChild(rowElem);
    })

    const tableContent = document.createDocumentFragment();
    tableContent.appendChild(generateTableHeader(dateSet));
    tableContent.appendChild(bodyElem);

    return tableContent;
}