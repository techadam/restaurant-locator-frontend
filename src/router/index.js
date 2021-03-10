import Vue from 'vue';
import VueRouter from 'vue-router'


//Components
import MapView from '@/views/MapView'
import Restaurants from '@/views/Restaurants'
import NewRestaurant from '@/views/NewRestaurant'
import Profile from '@/views/Profile'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: MapView, meta: {requiresAuth: true} },
    { path: '/restaurants', component: Restaurants },
    { path: '/new-restaurant', component: NewRestaurant, meta: {requiresAuth: true} },
    { path: '/profile', component: Profile, meta: {requiresAuth: true} },
    { path: '/login', component: Login },
];

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

//Route Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('usertoken')

    if (to.path !== '/login' && to.meta.requiresAuth === true && isAuthenticated === null) {
        return next('/login')
    }

    if((to.path === '/login' || to.path === '/register') && isAuthenticated !== null) {
        return next('/')
    }

    next()
})


export default router