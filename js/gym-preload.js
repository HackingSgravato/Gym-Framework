const watchers = [];

document.addEventListener('DOMContentLoaded', () => {
    // essential things to load before page is loaded
    preLoad();
});

window.addEventListener('load', () => {
    load();
});

window.addEventListener('resize', () => {
    adjustNavs();
});

function loadIframes() {
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach(element => {
        // take iframe container
        const container = element.parentElement;
        // take iframe toggle btn
        const toggleBtn = container.children[1];
        toggleBtn.addEventListener('click', () => {
            // toggle iframe fullscreen
            container.classList.toggle('fullscreen');
        });
    });
}

function loadNotifications() {
    const notifications = document.querySelectorAll('.notification');

    notifications.forEach(element => {
        // take close btn
        const closeBtn = element.children[0].children[1];
        closeBtn.addEventListener('click', () => {
            const notif = new GymNotification(element);
            notif.hide();
        });
    });
}

function loadDialogs() {
    const dialogs = document.querySelectorAll('.dialog');

    dialogs.forEach(element => {
        // take close btn
        const closeBtn = element.children[0].children[1];
        closeBtn.addEventListener('click', () => {
            const dialog = new GymDialog(element);
            dialog.hide();
        });
    });
}

function loadNavs() {
    // adjust navs first to prevent bugs
    adjustNavs();

    const navs = getNavs();

    navs.forEach(nav => {
        // add click event listener
        nav.addEventListener('click', () => {
            // if target is ::before
            if (event.target.tagName === 'DIV') {
                // take media
                const media = window.matchMedia('(max-width: 1024px)');
                if (media.matches) {
                    nav.classList.toggle('active');
                }
            }
        });

        // center and end sections
        const center = nav.querySelectorAll('div')[1];
        const end = nav.querySelectorAll('div')[2];

        // start section
        const start = nav.querySelectorAll('div')[0];

        const watcher = new ClassWatcher(nav, 'active',
            /* onActive */
            () => {
                center.style.display = 'flex';
                end.style.display = 'flex';
                start.classList.add('active');
            },
            /* onRemoved */
            () => {
                center.style.display = 'none';
                end.style.display = 'none';
                start.classList.remove('active');
            });

        watchers.push(watcher);
    });
}

function adjustNavs() {
    const navs = getNavs();

    navs.forEach(nav => {
        const center = nav.querySelectorAll('div')[1];
        const end = nav.querySelectorAll('div')[2];

        // take media query
        const media = window.matchMedia('(max-width: 1024px)');
        if (media.matches) {
            nav.classList.remove('active');
            center.style.display = 'none';
            end.style.display = 'none';
        }
        else {
            nav.classList.add('active');
            center.style.display = 'flex';
            end.style.display = 'flex';
        }
    });
}

function getNavs() {
    return document.querySelectorAll('.nav');
}

function preLoad() {
}

function load() {
    loadNavs();
    loadNotifications();
    loadDialogs();
    loadIframes();
}

class ClassWatcher {

    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
        this.classRemovedCallback = classRemovedCallback
        this.observer = null
        this.lastClassState = targetNode.classList.contains(this.classToWatch)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.targetNode, { attributes: true, childList: true, subtree: true })
    }

    disconnect() {
        this.observer.disconnect()
    }

    mutationCallback = mutationsList => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = mutation.target.classList.contains(this.classToWatch)
                if (this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if (currentClassState) {
                        this.classAddedCallback()
                    }
                    else {
                        this.classRemovedCallback()
                    }
                }
            }
        }
    }
}
