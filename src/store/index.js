import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        markerInfo: -1
    },
    mutations: {
        updateMarkerInfo: (state, payload) => {
            state.markerInfo = payload
        }
    }
})

export default store