function iniLogic() {
    const bookingPopupElem = document.getElementById('booking_popup');
    const changePopupElem = document.getElementById('change_popup');

    const bookingPopup = new ConfirmationPopup(bookingPopupElem);
    const changePopup = new ConfirmationPopup(changePopupElem);

    document.querySelectorAll('.Calendar__timeRadio').forEach((inputElem) => {
        const bookedByYou = inputElem.getAttribute('data-bookedByYou');
        const timeKey = inputElem.getAttribute('data-timeKey');
        const dateKey = inputElem.getAttribute('data-dateKey');

        if (bookedByYou) {
            inputElem.addEventListener('click', (event) => {
                event.preventDefault();
                changePopup.changeInfo(dateKey, timeKey);
                changePopup.open();
            })
        } else {
            inputElem.addEventListener('change', () => {
                bookingPopup.changeInfo(dateKey, timeKey);
                bookingPopup.open(() => {
                    inputElem.checked = false;
                });
            })
        }
    })
}