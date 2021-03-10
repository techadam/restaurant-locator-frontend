import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store';

//CSS
import '@/assets/css/style.scss';

Vue.config.productionTip = false;

//Global vars
Vue.prototype.$axios = axios;
Vue.prototype.$api = process.env.VUE_APP_API;
Vue.prototype.$firebaseMsgApi = process.env.VUE_APP_FIREBASE_API;
Vue.prototype.$firebaseKey = process.env.VUE_APP_FIREBASE_KEY;

//Google map
import * as VueGoogleMaps from 'vue2-google-maps';
 
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_KEY,
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
    connection: io(`${process.env.VUE_APP_API}`), // options object is Optional
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

//Filters
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)


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
