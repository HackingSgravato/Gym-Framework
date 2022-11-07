function openNotificationTest(){
    var element = document.querySelector('.notification');
    const notif = new GymNotification(element);
    notif.show();
}

function openDialogTest(){
    var element = document.querySelector('.dialog');
    const dialog = new GymDialog(element);
    dialog.show();
}