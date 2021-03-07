<template>
    <div>
        <Header />
        
        <div>
            <div class="page-jumbotron"></div>
            <div class="new-rest-form">
                <h4 class="text-center">
                    <ion-icon name="add-circle"></ion-icon>
                    Add restaurant
                </h4>
                <form @submit.prevent="saveRestaurant()">
                    <div class="form-group">
                        <label for="">Name</label>
                        <input type="text" class="form-control" placeholder="Name of restaurant" v-model="restaurant.name">
                    </div>
                    <div class="form-group">
                        <label for="">Latitude</label>
                        <input type="text" class="form-control" placeholder="Latitude of Retaurant" v-model="restaurant.lat">
                    </div>
                    <div class="form-group">
                        <label for="">Longitude</label>
                        <input type="text" class="form-control" placeholder="Longitude of Restaurant" v-model="restaurant.log">
                    </div>
                    <div class="form-group">
                        <label for="">Address</label>
                        <textarea class="form-control" v-model="restaurant.address" placeholder="address"></textarea>
                    </div>
                    <div class="form-group mt-4">
                        <button class="btn btn-main btn-block">Submit data</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header';

import io from "socket.io-client";
let socket = io.connect(`${process.env.VUE_APP_API}`);

export default {
    name: 'NewRestaurant',
    components: {
        Header
    },
    data() {
        return {
            restaurant: {
                name: '',
                log: '',
                lat: '',
                address: '',
            }
        }
    },
    methods: {
        saveRestaurant() {
            const { name, lat, log, address } = this.restaurant

            //Verify that fields are not empty
            if(!name || !lat || !log || !address) {
                this.$toast.open({
                    message: 'Fill all form fields and try again',
                    type: 'error',
                })
            }

            socket.emit('create-restaurant', this.restaurant, (response) => {
                if(response.status === true) {
                    this.restaurant = {
                        name: '',
                        log: '',
                        lat: '',
                        address: '',
                    }

                    this.$toast.open({
                        message: 'Restaurant saved successfully',
                        type: 'success',
                    })
                }else{
                    this.$toast.open({
                        message: 'Problem encountered. Please try again',
                        type: 'error',
                    })
                }
            })
        }
    },
}
</script>