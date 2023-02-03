class ConfirmationPopup {
    constructor(elem) {
        this.elem = elem;

        const closeButton = this.elem.querySelector('.ConfirmationPopup__close');
        closeButton.addEventListener('click', (event) => {
            this.close();
        })

        this.infoElem = this.elem.querySelector('.ConfirmationPopup__info');
    }

    open() {
        this.elem.classList.toggle('ConfirmationPopup--open');
    }

    close() {
        this.elem.classList.toggle('ConfirmationPopup--open');
    }

    changeInfo(date, time) {
        this.infoElem.innerHTML = `Your appointment: ${date}, ${time}`;
    }
}