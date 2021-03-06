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

    //messaging
    const messaging = firebase.messaging()

    messaging.setBackgroundMessageHandler((payload) => {
        const title = payload.data.username
        let iconPath = ''

        const options = {
            body: payload.data.message,
            icon: 'public/img/tmlogo.png'
        }

        return self.registration.showNotification(title, options)
    })
}catch(error) {
    console.log(error)
}