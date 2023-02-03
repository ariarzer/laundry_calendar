class ConfirmationPopup {
    constructor(elem) {
        this.elem = elem;

        const closeButton = this.elem.querySelector('.ConfirmationPopup__close');
        closeButton.addEventListener('click', (event) => {
            this.close();
        })

        this.infoElem = this.elem.querySelector('.ConfirmationPopup__info');

        this.escapeHandler = (event) => {
            if(event.key === 'Escape') {
                this.close();
            }
        }

        document.addEventListener('keydown', this.escapeHandler)
    }

    open() {
        this.elem.classList.toggle('ConfirmationPopup--open');
    }

    close() {
        document.removeEventListener('keydown', this.escapeHandler);
        this.elem.classList.toggle('ConfirmationPopup--open');
    }

    changeInfo(date, time) {
        this.infoElem.innerHTML = `Your appointment: ${date}, ${time}`;
    }
}