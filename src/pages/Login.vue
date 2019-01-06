<template>
  <Jumbotron>
    <span slot="title">Login</span>
    <div class="offset-sm-2 col-sm-8">
        <form class="beta-text" v-on:submit.prevent="login">
            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-9">
                <input type="email" v-model="email" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-9">
                <input type="password" v-model="password" class="form-control" required/>
                </div>
            </div>
            <div v-show="notValid" class="text-danger">
                Your email or password is incorrect.
            </div>
            <br>
            <center>
                <button
                    class="btn btn-lg btn-info ld-ext-right"
                    :class="{'running': isLoggingIn}"
                    type="submit"
                    >
                    Login
                    <div class="ld ld-ring ld-spin"></div>
                </button>
            </center>
        </form>
        <p class="signup-para">
            Don't have an account? You can <router-link to="/register" class="text-info">sign up here!</router-link>
        </p>
    </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../templates/Jumbotron.vue'
import auth from '../services/auth.js'

export default {
    name: 'Login',
    components: {
        Jumbotron
    },
    data() {
        return {
            email: '',
            password: '',
            notValid: false,
            isLoggingIn: false
        };
    },
    methods: {
        login() {
            this.isLoggingIn = true;
            let email = this.email;
            let password = this.password;

            auth.login(email, password)
                .then(response => {
                    auth.setUserPassword(
                        response.data.user_id,
                        response.data.username,
                        email,
                        password
                    )
                    Event.$emit('loggedIn');
                    this.$router.push('/');
                }).catch(() => {
                    // TODO distinguish between errors
                    auth.logout();
                    this.notValid = true;
                })
                .finally(() => {
                    this.isLoggingIn = false;
                });
        }
    }
}
</script>

<style scoped>
.signup-para {
    margin-top: 50px;
}
</style>
