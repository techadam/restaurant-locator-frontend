<template>
    <div>
        <Header />

        <div>
            <div class="page-jumbotron"></div>
            <div class="new-rest-form rest-list">
                <h4 class="text-center">
                    <ion-icon name="list-circle"></ion-icon>
                    Restaurants list
                </h4>
                
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Latitude-Longitude</th>
                                <th scope="col" v-if="token">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(rest, index) in restaurants" :key="index">
                                <th scope="row">{{index + 1}}</th>
                                <td>{{rest.name}}</td>
                                <td>{{rest.address}}</td>
                                <td>{{Number(rest.lat).toFixed(5)}} - {{Number(rest.log).toFixed(5)}}</td>
                                <td v-if="token">
                                    <button type="button" @click="restaurant = rest" class="btn btn-dark">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <EditRestaurant :restaurant="restaurant" v-if="restaurant" @closeModal="restaurant = null" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/Header";
import EditRestaurant from "@/components/EditRestaurant";

export default {
    name: 'RestaurantsView',
    components: {
        Header,
        EditRestaurant
    },
    data() {
        return {
            restaurant: null,
            self: this,
        }
    },
    sockets: {
        connect: function () {
            console.log('connected');
        },
        updatedRestaurants: function(data) {
            this.restaurants.unshift(data)
            //console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)', data);
        },
        editedRestaurant: function(data) {
            const index = this.restaurants.findIndex(rest => rest._id === data._id)
            this.restaurants.splice(index, 1, data)
        }
    },
    mounted() {
        this.$store.dispatch('getRestaurants');
    },
    methods: {
        
    },
    computed: {
        ...mapState([
            'restaurants'
        ]),
        token() {
            return localStorage.usertoken
        }
    }
}
</script>