import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        markerInfo: -1,
        usertoken: '',
        user: {},
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
    }
})

export default store