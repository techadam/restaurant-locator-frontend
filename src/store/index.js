import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        markerInfo: -1,
        usertoken: '',
        user: {},
        restaurants: []
    },
    getters: {
        getToken(state) {
            return state.usertoken || localStorage.usertoken
        }
    },
    mutations: {
        updateMarkerInfo: (state, payload) => {
            state.markerInfo = payload
        },
        updateToken: (state, payload) => {
            state.usertoken = payload || localStorage.usertoken
        },
        clearToken: (state) => {
            state.usertoken = ''
        },
        updateRestaurants: (state, payload) => {
            state.restaurants = payload
        }
    },
    actions: {
        getRestaurants: async({commit}) => {
            try {
                const res = await axios.get(`http://localhost:5000/restaurant`)
                commit('updateRestaurants', res.data.data)
            }catch(error) {
                console.log(error)
            }
        }
    }
})

export default store