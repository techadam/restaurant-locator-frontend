<template>
  <div id="app">
    <MapWrap :restaurants="restaurants" :center="center" />

    <Slider :restaurants="restaurants" @changeAnimation="updateAnimation" @clik="doStuff()"  />
  </div>
</template>

<script>
import MapWrap from './components/MapWrap.vue'
import Slider from './components/Slider'

export default {
  name: 'App',
  components: {
    MapWrap,
    Slider
  },
  data() {
    return {
      restaurants: [],
      center: null,
    }
  },
  mounted() {
    this.getRestaurants();
  },
  methods: {
    async getRestaurants() {
      try {
        const res = await this.$axios.get(`${this.$api}/restaurant`);
        const data = res.data.data.map(restaurant => {
          restaurant.animation = 0
          return restaurant
        })
        this.restaurants = data
      }catch(error) {
        console.log(error);
      }
    },
    updateAnimation(payload) {
      this.restaurants = this.restaurants.map(rest => {
        rest.animation = (payload.data._id === rest._id)? 1 : 0
        
        return rest
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
