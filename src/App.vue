<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {}
  },
  sockets: {
      updatedRestaurants: function () {
          this.$toast.open({
              message: 'New restaurant added to restaurants list',
              type: 'success',
          })
      },
      editedRestaurant: function (data) {
          this.$toast.open({
              message: `Restaurant with name ${data.name} has been updated with new info`,
              type: 'success',
          })
      },
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
