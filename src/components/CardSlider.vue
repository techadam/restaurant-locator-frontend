<template>
    <div>
        <div class="slider-wrapper">
            <flickity ref="flickity" :options="flickityOptions">
                <div class="carousel-cell" v-for="(rest, index) in restaurants" :key="index">
                    <div class="carousel-flex" @mouseover="showInfoMarker(rest, index)">
                        <div class="rest-img-card" :style="`background-image: url('https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`">
                            <ion-icon name="heart-outline"></ion-icon>
                        </div>
                        <div class="rest-info-card">
                            <h4>{{rest.name}}</h4>
                            <span class="text-muted rest-address-card">
                                {{rest.address}}
                            </span>
                            <div class="divider"></div>
                            <p class="rest-desc-card">Cuscous, shish Kebab, baklawa, falaffef</p>
                            <div class="rest-space-between">
                                <p class="rest-star-card"><ion-icon name="star"></ion-icon> 4.7</p>
                                <p><b>Distance: </b> {{getDistance(position, {lat: rest.lat, lon: rest.log})}}km</p>
                            </div>
                        </div>
                    </div>
                </div>
            </flickity>
        </div>
    </div>
</template>

<script>
import Flickity from 'vue-flickity'

export default {

    name: 'CardSlider',
    props: ['restaurants'],
    components: {
        Flickity
    },
    data() {
        return {
            restaurant: [],
            position: {},
            flickityOptions: {
                initialIndex: 3,
                prevNextButtons: false,
                pageDots: false,
                wrapAround: true
            }
        }
    },
    mounted() {
        this.getCoord()
    },
    methods: {
        getCoord() {
            navigator.geolocation.getCurrentPosition(position => {
                this.position = {lat: position.coords.latitude, lon: position.coords.longitude}
            }, error => {
                console.log(error)
            })
        },
        getDistance(cord1, cord2) {
            if (cord1.lat == cord2.lat && cord1.lon == cord2.lon) {
                return 0;
            }

            const radlat1 = (Math.PI * cord1.lat) / 180;
            const radlat2 = (Math.PI * cord2.lat) / 180;

            const theta = cord1.lon - cord2.lon;
            const radtheta = (Math.PI * theta) / 180;

            let dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

            if (dist > 1) {
                dist = 1;
            }

            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344; //convert miles to km

            return (dist).toFixed(0);
        },
        showInfoMarker(restaurant, index) {
            //this.restaurant = [restaurant]
            this.$emit('changeAnimation', {data: restaurant})
            this.$store.commit('updateMarkerInfo', index)
        },
    },
    watch: {
        // whenever question changes, this function will run
        restaurants: function (newRests, oldRests) {
            if(this.restaurants.length > 0 && oldRests.length < 1) {
                this.$nextTick(function () { // the magic
                    this.$refs.flickity.rerender()
                })
            }
        }
    },
}
</script>