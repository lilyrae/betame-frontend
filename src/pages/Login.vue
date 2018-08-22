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
                <button class="btn btn-lg btn-info" type="submit">Login</button>
            </center>
        </form>
    </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../templates/Jumbotron.vue'

export default {
    name: 'Login',
    components: {
        Jumbotron
    },
    data() {
        return {
            email: '',
            password: '',
            notValid: false
        };
    },
    methods: {
        login() {
            this.$http(
                {
                    method: 'get',
                    url: process.env.VUE_APP_API + "/login",
                    withCredentials: true,
                    auth: {
                            username: this.email,
                            password: this.password
                        }
                }).then(response => {
                    this.$router.push('/');
                }).catch(error => {
                    // TODO distinguish between errors
                    this.notValid = true;
                });
        }
    }
}
</script>