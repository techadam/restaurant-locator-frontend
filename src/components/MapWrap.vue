<template>
    <div>
        <h3>Find Your Favorite Restaurants</h3>
        {{center}}
        <div class="map-wrapper">
            <GmapMap
            ref="mapRef"
            :center="userPos"
            :zoom="7"
            map-type-id="terrain"
            style="width: 95vw; height: 90vh"
            >
                <GmapCircle v-if="position"
                    :center="position"
                    :radius="100000"
                    :visible="true"
                    :options="{fillColor:'blue',fillOpacity:0.5}"
                ></GmapCircle>
                <GmapMarker
                    :key="index"
                    v-for="(m, index) in restaurants"
                    :position="{lat: Number(m.lat), lng: Number(m.log)}"
                    :clickable="true"
                    :draggable="false"
                    :animation="m.animation"
                    @click="displayInfo(m)"
                    :icon="{
                        url: markerYellow,
                        size: {width: 100, height: 100, f: 'px', b: 'px'},
                    }"
                    class="bounce"
                >
                    <!--<GmapInfoWindow
                        @closeclick="window_open=false" 
                        :opened="window_open" 
                        :position="infowindow"
                    >
                        <p>{{m.name}}</p>
                        <p>{{m.address}}</p>
                    </GmapInfoWindow>-->
                </GmapMarker>
            </GmapMap>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Mapwrap',
  props: ['restaurants', 'center'],
  data() {
      return {
          position: {lat: 10, lng: 10},
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
    }
  }
}
</script>
