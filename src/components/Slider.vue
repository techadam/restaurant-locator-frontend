<template>
    <div>
        <div class="slider-wrapper">
            <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide v-for="(rest, index) in restaurants" :key="index">
                    <div class="slider-flex" @click="showInfo(rest)">
                        <img src="https://via.placeholder.com/140x100" class="" width="100%" alt="">
                        <div class="restaurant-info">
                            <h4>{{rest.name}}</h4>
                            <p>{{rest.address}}</p>
                            <p class=""><b>{{getDistanceBetweenTwoPoints({lat: rest.lat, lon: rest.log}, position)}}</b> km</p>
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
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    960: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 4,
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
        getDistanceBetweenTwoPoints(cord1, cord2) {
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

            return (dist / 1000).toFixed(4);
        },
        showInfo(restaurant) {
            this.restaurant = [restaurant]
            this.$emit('changeAnimation', {data: restaurant})
        },
    }
}
</script>