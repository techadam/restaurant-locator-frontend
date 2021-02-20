<template>
  <div class="hello">
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100vw; height: 100vh"
    >
        <GmapMarker
            :position="{lat: 11.9965, lng: 9.8375}"
            :clickable="true"
            :draggable="true"
        />

        <GmapMarker
            :key="index"
            v-for="(m, index) in restaurants"
            :position="{lat: Number(m.lat), lng: Number(m.log)}"
            :clickable="true"
            :draggable="false"
            @click="displayInfo(m)"
        />
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
