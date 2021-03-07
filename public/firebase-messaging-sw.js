importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js')

try {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyAuU0CKELHP-aGYayxCnLO7ENymUoyHKH0",
        authDomain: "s2rescue.firebaseapp.com",
        projectId: "s2rescue",
        storageBucket: "s2rescue.appspot.com",
        messagingSenderId: "819669685713",
        appId: "1:819669685713:web:c22dc312590d34cd7b3cf0",
        measurementId: "G-BWE9V2Y8BF"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    class CustomPushEvent extends Event {
        constructor(data) {
            super('push')
    
            Object.assign(this, data)
            this.custom = true
        }
    }
    
    /*
     * Overrides push notification data, to avoid having 'notification' key and firebase blocking
     * the message handler from being called
     */
    self.addEventListener('push', (e) => {
        // Skip if event is our own custom event
        if (e.custom) return;
    
        // Kep old event data to override
        let oldData = e.data
    
        // Create a new event to dispatch, pull values from notification key and put it in data key, 
        // and then remove notification key
        let newEvent = new CustomPushEvent({
            data: {
                json() {
                    let newData = oldData.json()
                    newData.data = {
                        ...newData.data,
                        ...newData.notification
                    }
                    delete newData.notification
                    return newData
                },
            },
            waitUntil: e.waitUntil.bind(e),
        })
    
        // Stop event propagation
        e.stopImmediatePropagation()
    
        // Dispatch the new wrapped event
        dispatchEvent(newEvent)
    })

    //messaging
    const messaging = firebase.messaging()

    /*messaging.setBackgroundMessageHandler((payload) => {
        const title = payload.data.username
        let iconPath = ''

        const options = {
            body: payload.data.message,
            icon: 'public/img/tmlogo.png'
        }

        return self.registration.showNotification(title, options)
    })*/

    messaging.onBackgroundMessage((payload) => {
        const notificationTitle = payload.data.username;
        const notificationOptions = {
            body: payload.data.message,
            icon: 'public/img/tmlogo.png',
            data: payload.data
        };
        return self.registration.showNotification(notificationTitle,
            notificationOptions);
    });
}catch(error) {
    console.log(error)
}