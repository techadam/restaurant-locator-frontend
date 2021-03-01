<template>
  <div id="app">
    <Header />

    <MapWrap :restaurants="restaurants" :center="center" />
    
    <CardSlider :restaurants="restaurants" @changeAnimation="updateAnimation"  />

    <!--<Slider :restaurants="restaurants" @changeAnimation="updateAnimation"  />-->
  </div>
</template>

<script>
import MapWrap from './components/MapWrap.vue'
//import Slider from './components/Slider'
import CardSlider from './components/CardSlider'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header,
    MapWrap,
    CardSlider,
    //Slider
  },
  data() {
    return {
      restaurants: [],
      center: null,
    }
  },
  mounted() {
    this.getRestaurants();

    /*const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      alert("tablet");
    }else if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      alert("mobile");
    }else{
      alert("desktop");
    }*/
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
