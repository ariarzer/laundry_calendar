function generateCalendarHTML(data) {
    const calendarElem = document.getElementById('calendar');
    calendarElem.innerHTML = '';

    const dateSet = new Set();

    const bodyElem = document.createElement('tbody');

    const bookingPopupElem = document.getElementById('booking_popup');
    const changePopupElem = document.getElementById('change_popup');

    const bookingPopup = new ConfirmationPopup(bookingPopupElem);
    const changePopup = new ConfirmationPopup(changePopupElem);

    Object.keys(data).forEach((timeRow) => {
        const rowElem = document.createElement('tr');
        rowElem.classList.add('Calendar__tr');

        Object.keys(data[timeRow]).forEach((dateRow) => {
            const {
                booked,
                value,
                bookedByYou
            } = data[timeRow][dateRow];

            dateSet.add(dateRow);

            const tdElem = document.createElement('td');
            tdElem.classList.add('Calendar__td');

            const labelElem = document.createElement('label');
            labelElem.classList.add('Calendar__timeSlot');
            if (bookedByYou) {
                labelElem.classList.add('Calendar__timeSlot--bookedByYou');
            }

            const inputElem = document.createElement('input');
            inputElem.type = 'radio';
            inputElem.name = 'laundry_slot';
            inputElem.value = value.getTime();
            inputElem.required = true;
            inputElem.disabled = booked;
            inputElem.classList.add('Calendar__timeRadio');
            if (bookedByYou) {
                inputElem.addEventListener('click', () => {
                    event.preventDefault();
                    changePopup.changeInfo(dateRow, timeRow);
                    changePopup.open();
                })

            } else {
                inputElem.addEventListener('click', () => {
                    bookingPopup.changeInfo(dateRow, timeRow);
                    bookingPopup.open();
                })
            }

            labelElem.appendChild(inputElem);

            const labelTextElem = document.createElement('span');
            const labelTextElemHours = document.createElement('span');
            labelTextElemHours.classList.add('Calendar__timeLabel--Hours');
            const labelTextElemMinutes = document.createElement('span');
            labelTextElemMinutes.classList.add('Calendar__timeLabel--Minutes');
            const [hours, minutes] = timeRow.split(':');
            labelTextElemHours.innerHTML = hours;
            labelTextElemMinutes.innerHTML = minutes;
            // labelTextElem.innerHTML = timeRow;
            labelTextElem.classList.add('Calendar__timeLabel');
            labelTextElem.appendChild(labelTextElemHours);
            labelTextElem.appendChild(labelTextElemMinutes);
            labelElem.appendChild(labelTextElem);

            tdElem.appendChild(labelElem);

            rowElem.appendChild(tdElem);
        })

        bodyElem.appendChild(rowElem);
    })

    const theadElem = document.createElement('thead');

    const trElem = document.createElement('tr');

    dateSet.forEach((date) => {
        const thElem = document.createElement('th');
        const [dayName, dayDate] = date.split(',');
        const container = document.createElement('div');

        const dayNameElem = document.createElement('span');
        dayNameElem.classList.add('Calendar__dayName');
        dayNameElem.innerHTML = dayName;
        container.appendChild(dayNameElem);

        const dayDateElem = document.createElement('span');
        dayDateElem.classList.add('Calendar__dayDate');
        dayDateElem.innerHTML = dayDate;
        container.appendChild(dayDateElem);

        container.classList.add('Calendar__dateHead');

        thElem.appendChild(container);
        trElem.appendChild(thElem);
    })

    theadElem.appendChild(trElem);

    const tableContent = document.createDocumentFragment();
    tableContent.appendChild(theadElem);
    tableContent.appendChild(bodyElem);

    return tableContent;
}