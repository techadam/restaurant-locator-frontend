<template>
  <div id="app">
    <router-view></router-view>
    <Notification />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/messaging'

import Notification from '@/components/NotificationBox.vue'

export default {
  name: 'App',
  components: {
    Notification
  },
  data() {
    return {
      firebaseToken: ''
    }
  },
  created() {
    this.initializeFirebaseToken();
  },
  methods: {
    initializeFirebaseToken() {
      try {
        firebase
          .messaging()
          .requestPermission()
          .then(() => {
            console.log("Notification Permision granted")
            return firebase
              .messaging()
              .getToken()
              .then((token) => {
                this.firebaseToken = token;
              })
              .catch(error => {
                window.console.log(`unable to get token ${error}`)
              })
          })
      }catch(error) {
        console.log(error)
      }
    }
  },
  sockets: {
      updatedRestaurants: function () {
        this.$axios.post(`${this.firebaseMsgApi}`, {
          to: this.firebaseToken,
          data : {
            username : "Notification",
            message: "A new restaurant has been updated"
          }
        }, {
          headers: {
            Authorization: `${this.$firebaseKey}`
          }
        })
        /*this.$toast.open({
            message: 'New restaurant added to restaurants list',
            type: 'success',
        })*/
      },
      editedRestaurant: function (data) {
        this.$axios.post(`${this.$firebaseMsgApi}`, {
          to: this.firebaseToken,
          data : {
            username : "Notification",
            message: `Restaurant with name ${data.name} has been updated with new info`
          }
        }, {
          headers: {
            Authorization: `${this.$firebaseKey}`
          }
        })
        /*this.$toast.open({
            message: `Restaurant with name ${data.name} has been updated with new info`,
            type: 'success',
        })*/
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
