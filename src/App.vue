<template>
  <div id="app">
    <MapWrap />
  </div>
</template>

<script>
import MapWrap from './components/MapWrap.vue'

export default {
  name: 'App',
  components: {
    MapWrap
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
