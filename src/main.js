import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store';

//CSS
import '@/assets/css/style.scss';

Vue.config.productionTip = false;

//Global vars
Vue.prototype.$axios = axios;
Vue.prototype.$api = `http://localhost:5000`;
Vue.prototype.$firebaseMsgApi = `https://fcm.googleapis.com/fcm/send`;
Vue.prototype.$firebaseKey = "key=AAAAvtge1dE:APA91bFssSdOVcajq7oZzzVg1s7fqV3qmVXhbVnGeSn6NIRXQ0NDr9wGt8ZGpaep7P-SAelqVpuZXcLR-8GAPbxlyHGJu7eD4qOuxGqAEuj-1oAnm-FL5RcENeFQUsANCQ0A7vVqC11i";

//Google map
import * as VueGoogleMaps from 'vue2-google-maps';
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_KEY',
    libraries: 'places',
  },
});

//ion icon setup
Vue.config.ignoredElements = [/^ion-/];


//Socket.io 
// socket io
import * as io from "socket.io-client";
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io('http://localhost:5000'), // options object is Optional
  })
);


//Firebase config
import firebase from 'firebase/app';
import 'firebase/messaging';

// // Initialize Firebase
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

navigator.serviceWorker.register('firebase-messaging-sw.js', {scope: "firebase-cloud-messaging-push-scope"})
.then((registration) => {
    const messaging = firebase.messaging();
    messaging.useServiceWorker(registration);

}).catch(err => {
    console.log(err);
})


//Sweet alert
import VueSwal from 'vue-swal';
Vue.use(VueSwal);


//Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
 // import style
import 'swiper/swiper-bundle.css';
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

//Toast Notification
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

//router
import router from './router';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
