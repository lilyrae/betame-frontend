<template>
  <Jumbotron>
    <span slot="title">Create an Account</span>
    <div class="offset-sm-2 col-sm-8">
        <ErrorAlert v-if="error" :error="error"/>
        <div v-else>
            <form class="beta-text" v-on:submit.prevent="signup">
                <div class="form-group row">
                    <label for="username" class="col-md-2 col-form-label">Username</label>
                    <div class="col-md-9">
                    <input type="text" v-model="username" class="form-control" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-md-2 col-form-label">Email</label>
                    <div class="col-md-9">
                    <input type="email" v-model="email" class="form-control" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-md-2 col-form-label">Password</label>
                    <div class="col-md-9">
                    <input type="password" v-model="password" class="form-control" required/>
                    </div>
                </div>
                <br>
                <center>
                    <button
                        class="btn btn-lg btn-info ld-ext-right"
                        :class="{'running': isSigningUp}"
                        type="submit"
                        >
                        Sign up
                        <div class="ld ld-ring ld-spin"></div>
                    </button>
                </center>
            </form>
        </div>
    </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../layouts/Jumbotron.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import auth from '../services/auth.js'
import user from '../services/user.js'

export default {
    name: 'Signup',
    components: {
        Jumbotron,
        ErrorAlert
    },
    props: {
        token: String
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            isSigningUp: false,
            isLoadingPage: true,
            error: null
        };
    },
    created() {
        this.isLoadingPage = true
        user.isValidInvite(this.token)
            .then(() => {
                this.isLoadingPage = false
            }).catch((error) => {
                this.error = error
            })
    },
    methods: {
        signup() {
            this.isSigningUp = true;

            auth.signup(this.username, this.email, this.password, this.token)
                .then(() => {
                    this.$router.push('/login');
                }).catch(error => {
                    this.error = error
                })
                .finally(() => {
                    this.isSigningUp = false;
                });
        }
    }
}
</script>