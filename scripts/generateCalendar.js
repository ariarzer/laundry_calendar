function generateCalendar(data) {
    const calendarElem = document.getElementById('calendar');
    calendarElem.innerHTML = '';

    const dateSet = new Set();

    const today = new Date();

    const bodyElem = document.createElement('tbody');

    const bookingPopupElem = document.getElementById('booking_popup');
    const changePopupElem = document.getElementById('change_popup');

    const bookingPopup = new ConfirmationPopup(bookingPopupElem);
    const changePopup = new ConfirmationPopup(changePopupElem);

    Object.keys(data).forEach((timeRow) => {
        const rowElem = document.createElement('tr');
        rowElem.classList.add('Calendar__tr');

        Object.keys(data[timeRow]).forEach((dateRow) => {
            console.log(dateRow);
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
            inputElem.value = new Date(value).getTime();
            inputElem.required = true;
            inputElem.disabled = booked || new Date(value) < today;
            inputElem.classList.add('Calendar__timeRadio');
            if (bookedByYou) {
                inputElem.addEventListener('click', () => {
                    event.preventDefault();
                    changePopup.changeInfo(dateRow, timeRow);
                    changePopup.open();
                })
            } else {
                inputElem.addEventListener('change', () => {
                    bookingPopup.changeInfo(dateRow, timeRow);
                    bookingPopup.open((() => {
                        inputElem.checked = false;
                    }));
                })
            }

            labelElem.appendChild(inputElem);

            const [hours, minutes] = timeRow.split(':');

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

    const theadElem = document.createElement('thead');

    const trElem = document.createElement('tr');

    dateSet.forEach((date) => {
        const [dayName, dayDate] = date.split(',');
        console.log(date)

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

    const tableContent = document.createDocumentFragment();
    tableContent.appendChild(theadElem);
    tableContent.appendChild(bodyElem);

    return tableContent;
}