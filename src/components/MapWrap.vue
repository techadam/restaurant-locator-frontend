<template>
    <div>
        <h3>Find Your Favorite Restaurants</h3>

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
  props: ['restaurants'],
  data() {
      return {
          position: {lat: 10, lng: 10}
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
        return this.position
    }
  }
}
</script>
