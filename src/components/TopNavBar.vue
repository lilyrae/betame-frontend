<template>
    <nav class="navbar navbar-expand-sm navbar-dark fixed-top background-black">
        <router-link class="navbar-brand beta-title" to="/">Beta me.</router-link>

        <!-- Page Links -->
        <ul class="navbar-nav">
            <li class="nav-item" v-if="!loggedIn">
                <router-link class="nav-link beta-text" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="loggedIn">
                <router-link class="nav-link beta-text" to="/me">My Account</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link beta-text" to="/about">About</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import auth from '../services/auth.js'

export default {
    name: 'TopNavBar',
    computed: {
        loggedIn() {
            return auth.isLoggedIn();
        }
    }
}
</script>
