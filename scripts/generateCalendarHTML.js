function generateCalendarHTML(data) {
    const calendarElem = document.getElementById('calendar');
    calendarElem.innerHTML = '';

    const dateSet = new Set();

    const bodyElem = document.createElement('tbody');

    Object.keys(data).forEach((timeRow) => {
        const rowElem = document.createElement('tr');
        const thElem = document.createElement('th');
        thElem.innerHTML = timeRow;

        rowElem.appendChild(thElem);

        Object.keys(data[timeRow]).forEach((dateRow) => {
            const {
                booked,
                value
            } = data[timeRow][dateRow];

            dateSet.add(dateRow);

            const tdElem = document.createElement('td');
            tdElem.classList.add(booked ? 'booked' : 'free');

            const inputElem = document.createElement('input');
            inputElem.type = 'radio';
            inputElem.name = 'laundry_slot';
            inputElem.value = value.getTime();
            inputElem.required = true;
            inputElem.disabled = booked

            tdElem.appendChild(inputElem);

            rowElem.appendChild(tdElem);
        })

        bodyElem.appendChild(rowElem);
    })

    const theadElem = document.createElement('thead');

    const trElem = document.createElement('tr');

    const thElem = document.createElement('th');
    trElem.appendChild(thElem); // gap cell

    dateSet.forEach((date) => {
        const thElem = document.createElement('th');
        thElem.innerHTML = date;
        trElem.appendChild(thElem);
    })

    theadElem.appendChild(trElem);

    const tableContent = document.createDocumentFragment();
    tableContent.appendChild(theadElem);
    tableContent.appendChild(bodyElem);

    return tableContent;
}