<template>
    <div>
        
        <div class="map-wrapper">
            <GmapMap
                ref="mapRef"
                :center="(markerInfo >= 0)? {lat: Number(restaurants[markerInfo].lat), lng: Number(restaurants[markerInfo].log)} : userPos"
                :zoom="12"
                map-type-id="roadmap"
                style="width: 100vw; height: 100vh"
                :options="{
                    mapTypeControl: false,
                    fullscreenControl: false,
                }"
            >
                <GmapMarker
                    v-if="position"
                    :position="position"
                    :icon="{
                        url: markerYellow,
                        size: {width: 100, height: 100, f: 'px', b: 'px'},
                    }"
                    class="bounce"
                ></GmapMarker>
                <GmapMarker
                    :key="index"
                    v-for="(m, index) in restaurants"
                    :position="{lat: Number(m.lat), lng: Number(m.log)}"
                    :clickable="true"
                    :draggable="false"
                    :animation="m.animation"
                    @click="displayInfo(m)"
                    :icon="{
                        url: markerRed,
                        size: {width: 100, height: 100, f: 'px', b: 'px'},
                    }"
                    class="bounce"
                >
                    <GmapInfoWindow
                        @closeclick="window_open=false" 
                        :opened="window_open" 
                        :position="{lat: Number(m.lat), lng: Number(m.log)}"
                        v-if="markerInfo === index"
                    >
                        <div class="info-window-card">
                            <h4>{{m.name}}</h4>
                            <p>{{m.address}}</p>
                        </div>
                    </GmapInfoWindow>
                </GmapMarker>
            </GmapMap>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Mapwrap',
  props: ['restaurants', 'center'],
  data() {
      return {
          position: {lat: 10, lng: 10},
          window_open: true,
          markerYellow: require('@/assets/img/marker-yellow.png'),
          markerRed: require('@/assets/img/marker-red.png'),
      }
  },
  mounted() {
    //this.position = {lat: 10.8876, lng: 11.9876}
    this.getCoord()
  },
  methods: {
    getCoord() {
        navigator.geolocation.getCurrentPosition(position => {
            this.position = {lat: position.coords.latitude, lng: position.coords.longitude}
            console.log(this.position)
        }, error => {
            console.log(error)
        })
    },
    displayInfo(restaurant) {
        this.$swal(`${restaurant.name} can be found @address - ${restaurant.address}`)
    },
  },
  computed: {
    userPos() {
        const isCentered = this.restaurants.find(rest => rest.animation > 0)
        if(isCentered) {
            return {lat: Number(isCentered.lat), lng: Number(isCentered.log)}
        }

        return this.position
    },
    ...mapState([
        'markerInfo'
    ])
  }
}
</script>
