class GymNotification {
    constructor(element: HTMLElement) {
        this.notif = element;
    }
    show() {
        if (this.notif) {
            this.notif.style.display = 'flex';
        }
    }
    hide() {
        if (this.notif) {
            this.notif.style.display = 'none';
        }
    }

    private notif: HTMLElement;
}

class GymDialog {
    constructor(element: HTMLElement) {
        this.dialog = element;
        this.film = document.querySelector('.dialogs-film');
    }
    show() {
        if (this.dialog) {
            if (this.film) {
                this.film.style.display = 'block';
            }
            this.dialog.style.display = 'flex';
        }
    }
    hide() {
        if (this.dialog) {
            this.dialog.style.display = 'none';
            if (this.film) {
                this.film.style.display = 'none';
            }
        }
    }

    private dialog: HTMLElement;
    private film: HTMLElement | null;
}