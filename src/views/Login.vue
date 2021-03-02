<template>
    <div>
        <div class="account-wrapper">

            <form @submit.prevent="login" class="account-form">
                <img src="@/assets/img/tmlogo.png" width="170px" alt="">
                <h1>S2Rescue</h1>
                <h3>Sign into your account</h3>

                <div class="form-group">
                    <label for="">Email</label>
                    <input type="email" v-model="user.email" class="form-control" placeholder="hello@example.com">
                </div>

                <div class="form-group">
                    <label for="">Password</label>
                    <input type="password" v-model="user.password" class="form-control" placeholder="******">
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-block btn-main mb-3 mt-4">Sign me in</button>

                    <small>Don't have an account? <router-link to="/" href="">Sign up</router-link></small>
                </div>

            </form>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        async login() {
            const { email, password } = this.user;

            //validate empty input
            if(!email || !password) {
                return this.$toast.open({
                    message: 'All fields required. Please try again',
                    type: 'error',
                });
            }

            //Send data to server
            try {
                const res = await this.$axios.post(`${this.$api}/auth/login`, this.user);
                const { data } = res
                localStorage.usertoken = data.token

                this.$toast.open({
                    message: 'Login sucessful!',
                    type: 'success',
                })

                //Go to auth page
                this.$router.push('/')
            }catch(error) {
                this.$toast.open({
                    message: error.response.data.message || 'Problem encountered. Please try again',
                    type: 'error',
                })
            }
        }
    }
}
</script>