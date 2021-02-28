<template>
    <div>
        
        <div class="map-wrapper">
            <!--<button type="button" @click="toPos()">Test map</button>-->
            <GmapMap
                ref="mapRef"
                :center="(markerInfo >= 0)? {lat: Number(restaurants[markerInfo].lat), lng: Number(restaurants[markerInfo].log)} : userPos"
                :zoom="12"
                @zoom_changed="getCoord()"
                map-type-id="roadmap"
                style="width: 100vw; height: 100vh"
                :options="{
                    mapTypeControl: false,
                    fullscreenControl: false,
                }"
            >
                <GmapCircle v-if="position"
                    :center="position"
                    :radius="5000"
                    :visible="true"
                    :options="{fillColor:'#2E9DFF',fillOpacity:0.5,strokeColor:'#0087FF',strokeWeight:1}"
                >
                </GmapCircle>
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
import Distance from 'geo-distance/lib/geo-distance.js'

export default {
  name: 'Mapwrap',
  props: ['restaurants', 'center'],
  data() {
      return {
          map: null,
          position: {lat: 10, lng: 10},
          window_open: true,
          markerYellow: require('@/assets/img/marker-yellow.png'),
          markerRed: require('@/assets/img/marker-red.png'),
      }
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => this.map = map)
    this.getCoord()
  },
  methods: {
    getCoord() {
        navigator.geolocation.getCurrentPosition(position => {
            this.position = {lat: position.coords.latitude, lng: position.coords.longitude}
            //console.log(this.position)
        }, error => {
            console.log(error)
        })
    },
    displayInfo(restaurant) {
        this.$swal(`${restaurant.name} can be found @address - ${restaurant.address}`)
    },
    toPos() {
        var Oslo = {
            lat: 59.914,
            lon: 10.752
        };
        var Berlin = {
            lat: 52.523,
            lon: 13.412
        };
        let OsloToBerlin = Distance.between(Oslo, Berlin);
        console.log(OsloToBerlin)
        this.map.setZoom(2)
        this.map.panTo(this.position)
        this.map.setZoom(12)
    }
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
