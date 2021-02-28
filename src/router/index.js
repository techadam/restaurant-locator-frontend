import Vue from 'vue';
import VueRouter from 'vue-router'


//Components

Vue.use(VueRouter)

const routes = [
    //{ path: '/login', component: Login },
];

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

//Route Guard


export default router