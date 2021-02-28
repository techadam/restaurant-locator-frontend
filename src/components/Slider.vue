<template>
    <div>
        <div class="slider-wrapper">
            <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide v-for="(rest, index) in restaurants" :key="index">
                    <!-- <div class="slider-flex" @click="showInfo(rest)"> -->
                    <div class="slider-flex" @mouseover="showInfoMarker(rest, index)">
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
                            <p class="rest-star-card"><ion-icon name="star"></ion-icon> 4.7</p>
                            <p><b>Distance: </b> {{getDistance(position, {lat: rest.lat, lon: rest.log})}}km</p>
                        </div>
                    </div>
                </swiper-slide>
                
            </swiper>
        </div>

        <InfoModal :restaurant="restaurant" />
    </div>
</template>

<script>
import InfoModal from './InfoModal'

export default {

    name: 'Slider',
    props: ['restaurants'],
    components: {
        InfoModal,
    },
    data() {
        return {
            restaurant: [],
            position: {},
            swiperOptions: {
                lazy: true,
                slidesPerView: 1,
                spaceBetween: 10,
                centeredSlides: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    960: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }
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
        showInfo(restaurant) {
            /*this.restaurant = [restaurant]
            this.$emit('changeAnimation', {data: restaurant})*/

            const { lat, log } = restaurant
            const cord2 = {latitude: Number(lat), longitude: Number(log)}
            const cord1 = {latitude: this.position.lat, longitude: this.position.lon}
            console.log(cord2, cord1)

            this.$axios.post(`${this.$api}/restaurant/get-distance`, {cord1, cord2})
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        showInfoMarker(restaurant, index) {
            //this.restaurant = [restaurant]
            this.$emit('changeAnimation', {data: restaurant})
            this.$store.commit('updateMarkerInfo', index)
        },
    }
}
</script>