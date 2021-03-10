<template>
    <div>
        <Header />

        <div>
            <div class="page-jumbotron"></div>
            
            <div class="profile-card">
                <div class="profile-img-wrapper">
                    <div class="profile-img" :style="`background-image: url(${user.photo || 'https://www.fillmurray.com/640/360'})`"></div>
                    <h3>{{user.firstName | capitalize}} {{user.lastName | capitalize}}</h3>
                </div>

                <div class="user-info-wrapper">
                    <div class="user-info-flex">
                        <div class="user-info-single">
                            <span>
                                <ion-icon name="mail"></ion-icon> Email
                            </span>
                            <p>{{user.email}}</p>
                        </div>
                        <div class="user-info-single">
                            <span>
                                <ion-icon name="people-circle"></ion-icon> Social login
                            </span>
                            <p>{{(user.socialType && user.socialType) !== 'normal'? user.socialType : 'None' | capitalize}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";

export default {
    name: 'Profile',
    components: {
        Header
    },
    data() {
        return {
            user: {}
        }
    },
    async mounted() {
        await this.getUser();
    },
    methods: {
        async getUser() {
            try {
                const res = await this.$axios.get(`${this.$api}/auth/user`, {
                    headers: this.userToken
                });
                this.user = res.data.data
            }catch(error) {
                console.log(error);
            }
        }
    },
    computed: {
        userToken() {
            return {authorization: `Bearer ${localStorage.usertoken}`};
        }
    }
}
</script>