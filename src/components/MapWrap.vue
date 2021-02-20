<template>
  <div class="map-wrapper">
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 80vw; height: 80vh"
    >
        <GmapMarker
            :key="index"
            v-for="(m, index) in restaurants"
            :position="{lat: Number(m.lat), lng: Number(m.log)}"
            :clickable="true"
            :draggable="false"
            @click="displayInfo(m)"
        >
            <GmapInfoWindow
                @closeclick="window_open=false" 
                :opened="window_open" 
                :position="infowindow"
            >
                <p>{{m.name}}</p>
                <p>{{m.address}}</p>
            </GmapInfoWindow>
        </GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'Mapwrap',
  data() {
    return {
      restaurants: []
    }
  },
  mounted() {
    this.getRestaurants();
  },
  methods: {
    async getRestaurants() {
      try {
        const res = await this.$axios.get(`${this.$api}/restaurant`);
        this.restaurants = res.data.data;
      }catch(error) {
        console.log(error);
      }
    },
    displayInfo(restaurant) {
        console.log(restaurant)
    }
  }
}
</script>
