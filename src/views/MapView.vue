<template>
    <div>
        <Header />

        <MapWrap :restaurants="restaurants" :center="center" />
        
        <CardSlider :restaurants="restaurants" @changeAnimation="updateAnimation"  />
    </div>
</template>

<script>
import MapWrap from '@/components/MapWrap.vue'
//import Slider from '@/components/Slider'
import CardSlider from '@/components/CardSlider'
import Header from '@/components/Header'

export default {
    name: 'MapView',
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

        const ua = navigator.userAgent;
        console.log(ua)
        /*if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            
        }else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            alert("mobile");
        }else{
            alert("desktop");
        }*/
    },
    methods: {
        async getRestaurants() {
            try {
                const res = await this.$axios.get(`${this.$api}/restaurant`, {
                    headers: this.userToken
                });
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
    },
    computed: {
        userToken() {
            return {authorization: `Bearer ${localStorage.usertoken}`}
        }
    }
}
</script>