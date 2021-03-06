<template>
    <div>
        <div class="edit-rest-modal">
            <div class="rest-modal-wrapper">
                <div class="new-rest-form edit">
                    <button class="rest-modal-close" @click="$emit('closeModal')">
                        <ion-icon name="close"></ion-icon>
                    </button>

                    <h4 class="text-center">
                        <ion-icon name="create"></ion-icon>
                        Edit restaurant
                    </h4>
                    <form @submit.prevent="updateRestaurant()">
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
    </div>
</template>

<script>

export default {
    name: 'NewRestaurant',
    props: ['restaurant'],
    methods: {
        async updateRestaurant() {
            const { name, lat, log, address } = this.restaurant

            //Verify that fields are not empty
            if(!name || !lat || !log || !address) {
                this.$toast.open({
                    message: 'Fill all form fields and try again',
                    type: 'error',
                })
            }

            try {
                await this.$axios.post(`${this.$api}/restaurant/edit`, this.restaurant)
                /*this.$toast.open({
                    message: 'Restaurant updated successfully',
                    type: 'success',
                })*/
                this.$emit('closeModal')
            }catch(error) {
                this.$toast.open({
                    message: error.response.data.error,
                    type: 'error',
                })
            }
        }
    },
}
</script>