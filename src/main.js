import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

Vue.config.productionTip = false;

//Global vars
Vue.prototype.$axios = axios;
Vue.prototype.$api = `http://localhost:5000`;

//Google map
import * as VueGoogleMaps from 'vue2-google-maps';
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAyWkj870Jb_FFzL32qnaXRhMRI96k0YV4',
    libraries: 'places',
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');
