<template>
    <div>
        <div :class="`info-modal ${restaurant.length > 0 ? 'active' : ''}`" v-if="restaurant.length > 0">
            <div class="close">
                <button @click="restaurant = []">
                    <span class="las la-times-circle"></span>
                </button>
            </div>
            
            <div>
                <img src="https://via.placeholder.com/140x100" width="100%" alt="">
                <div class="p2">
                    <h2>{{foodPlace.name}}</h2>
                    <p>{{foodPlace.address}}</p>
                    <p><b>Lat:</b> <span>{{foodPlace.lat}}</span> - <b>Long:</b> <span>{{foodPlace.log}}</span></p>
                    <p>{{getDistanceBetweenTwoPoints}} km</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InfoModal',
    props: ['restaurant'],
    data() {
        return {
            position: {}
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
    },
    computed: {
        foodPlace() {
            return this.restaurant[0]
        },
        getDistanceBetweenTwoPoints() {
            if(this.restaurant.length < 1) return 0

            const { lat, log } = this.restaurant[0]
            const cord2 = {lat: Number(lat), lon: Number(log)}
            const cord1 = this.position

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

            //console.log(cord1, cord2)

            return dist / 1000;
        }
    },
}
</script>