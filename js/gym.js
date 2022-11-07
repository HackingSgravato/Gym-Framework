var GymNotification = /** @class */ (function () {
    function GymNotification(element) {
        this.notif = element;
    }
    GymNotification.prototype.show = function () {
        if (this.notif) {
            this.notif.style.display = 'flex';
        }
    };
    GymNotification.prototype.hide = function () {
        if (this.notif) {
            this.notif.style.display = 'none';
        }
    };
    return GymNotification;
}());
var GymDialog = /** @class */ (function () {
    function GymDialog(element) {
        this.dialog = element;
        this.film = document.querySelector('.dialogs-film');
    }
    GymDialog.prototype.show = function () {
        if (this.dialog) {
            if (this.film) {
                this.film.style.display = 'block';
            }
            this.dialog.style.display = 'flex';
        }
    };
    GymDialog.prototype.hide = function () {
        if (this.dialog) {
            this.dialog.style.display = 'none';
            if (this.film) {
                this.film.style.display = 'none';
            }
        }
    };
    return GymDialog;
}());
