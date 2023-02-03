class ConfirmationPopup {
    constructor(elem) {
        this.elem = elem;

        const closeButton = this.elem.querySelector('.ConfirmationPopup__close');
        closeButton.addEventListener('click', (event) => {
            this.close();
        })

        this.timeElem = this.elem.querySelector('.ConfirmationPopup__time');
    }

    open(closeCallback) {
        if (closeCallback) {
          this.closeCallback = closeCallback
        }
        this.elem.classList.toggle('ConfirmationPopup--open');

        this.escapeHandler = (event) => {
            if(event.key === 'Escape') {
                this.close(closeCallback);
            }
        }

        document.addEventListener('keydown', this.escapeHandler)
    }

    close() {
        document.removeEventListener('keydown', this.escapeHandler);
        this.elem.classList.toggle('ConfirmationPopup--open');
        if (this.closeCallback) {
            this.closeCallback();
        }
    }

    changeInfo(date, time) {
        this.timeElem.innerHTML = `${date}, ${time}`;
    }
}