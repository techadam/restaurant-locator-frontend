import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

//CSS
import '@/assets/css/style.css'

Vue.config.productionTip = false;

//Global vars
Vue.prototype.$axios = axios;
Vue.prototype.$api = `http://localhost:5000`;

//Google map
import * as VueGoogleMaps from 'vue2-google-maps';
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_KEY',
    libraries: 'places',
  },
});

//Sweet alert
import VueSwal from 'vue-swal'
Vue.use(VueSwal)


//Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
 // import style
import 'swiper/swiper-bundle.css'
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


new Vue({
  render: h => h(App),
}).$mount('#app');
