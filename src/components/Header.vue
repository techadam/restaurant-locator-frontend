<template>
    <div>
        
        <input type="checkbox" id="mobile-nav-toggle">
        <div class="mobile-menu-wrapper">
            
            <!-- menu -->
            <div class="mobile-menu">
                <label for="mobile-nav-toggle"></label>

                <div class="mobile-menu-inner">
                    <div class="menu-logo">
                        <img src="@/assets/img/tmlogo.png" width="70%" alt="">
                    </div>

                    <div class="menu-block main">
                        <ul v-if="token">
                            <li>
                                <router-link to="/" class="link-item">
                                    <ion-icon name="hand-right"></ion-icon> Partner With Us
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="link-item">
                                    <ion-icon name="cart"></ion-icon> Cart
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="link-item">
                                    <ion-icon name="notifications"></ion-icon> Notifications
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="link-item">
                                    <ion-icon name="information-circle"></ion-icon> About Us
                                </router-link>
                            </li>
                        </ul>

                        <ul v-else>
                            <li>
                                <router-link to="/login" class="link-item">
                                    <ion-icon name="hand-right"></ion-icon> Sign in
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/restaurants" class="link-item">
                                    <ion-icon name="list-circle"></ion-icon> Retaurants
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <div class="menu-divider"></div>

                    <div class="menu-block">
                        <ul v-if="token">
                            <li>
                                <router-link to="/new-restaurant" class="link-item">
                                    <ion-icon name="add-circle"></ion-icon> Add Restaurant
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/restaurants" class="link-item">
                                    <ion-icon name="list-circle"></ion-icon> Retaurants
                                </router-link>
                            </li>
                            <li>
                                <a @click.prevent="logout()" href="#" class="link-item">
                                    <ion-icon name="power"></ion-icon> Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <header class="main-header">
            <div class="wrapper">
                <nav>
                    <label for="mobile-nav-toggle" class="menu-toggle-sm">
                        <ion-icon name="menu"></ion-icon>
                    </label>

                    <div>
                        <ul v-if="token">
                            <li>
                                <router-link to="/" class="link-icon">
                                    <ion-icon name="cart-outline"></ion-icon>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="link-icon">
                                    <ion-icon name="notifications-outline"></ion-icon>
                                </router-link>
                            </li>
                            <li class="hide-sm">
                                <router-link to="/" class="link-text">About Us</router-link>
                            </li>
                            <li class="hide-sm">
                                <a @click.prevent="logout()" href="#" class="link-text">Logout</a>
                            </li>
                            <li class="hide-sm">
                                <router-link to="/" class="link-btn">Partner With Us</router-link>
                            </li>
                        </ul>

                        <ul v-else>
                            <li class="hide-sm">
                                <router-link to="/restaurants" class="link-text">Restaurants</router-link>
                            </li>
                            <li class="hide-sm">
                                <router-link to="/login" class="link-btn">Login</router-link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    </div>
</template>

<script>

export default {
    name: 'Header',
    methods: {
        async logout() {
            //log out device
            try {
                await this.$axios.delete(`${this.$api}/auth/logout`, {
                    headers: this.userToken
                })
                
                //clear localstorage and remove vuex store values
                localStorage.clear()
                this.$store.commit('clearToken')

                this.$toast.open({
                    message: 'Logout successful',
                    type: 'success',
                })

                this.$router.push('/login')
            }catch(error) {
                this.$toast.open({
                    message: error.response.data.message || 'Problem encountered. Please try again',
                    type: 'error',
                })
            }
        }
    },
    computed: {
        userToken() {
            return {authorization: `Bearer ${localStorage.usertoken}`}
        },
        token() {
            return localStorage.usertoken
        }
    }
}
</script>