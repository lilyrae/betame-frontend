<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top background-black betame-topnavbar">
        <router-link class="navbar-brand beta-title" to="/">Beta me.</router-link>

        <button class="navbar-toggler" type="button" @click="toggleNavDropdown">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse" :class="navDropdownClass">
            <!-- Page Links -->
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item" v-if="loggedIn">
                    <router-link class="nav-link beta-text" to="/story/new">Create New</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link beta-text" to="/about">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link beta-text" to="/cookies">Leaderboard</router-link>
                </li>
            </ul>
            <!-- Logout Button -->
            <div class="my-2 my-lg-0" >
                <div v-if="loggedIn">
                    <router-link class="btn betame-button beta-link" to="/me">My Account</router-link>
                    <button class="btn btn-secondary" @click="logout">Logout</button>
                </div>
                <div v-else>
                    <router-link class="btn betame-button beta-link" to="/login">Login</router-link>
                    <router-link class="btn betame-dark-button beta-link" to="/register">Sign up</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import auth from '../../services/auth.js'

export default {
    name: 'TopNavBar',
    data() {
        return {
            showNavDropdown: false,
            loggedIn: false
        };
    },
    methods: {
        toggleNavDropdown() {
            this.showNavDropdown = !this.showNavDropdown;
        },
        logout() {
            auth.logout();
            this.$router.push('/');
        }
    },
    computed: {
        navDropdownClass() {
            return [ this.showNavDropdown ? 'in' : 'collapse'];
        }
    },
    mounted() {
        Event.$on('loggedOut', () => {
            this.loggedIn = auth.isLoggedIn();
        });
        Event.$on('loggedIn', () => {
            this.loggedIn = auth.isLoggedIn();
        });
        this.loggedIn = auth.isLoggedIn();
    }
}
</script>

<style scoped>
.betame-topnavbar {
    min-height: 6.5vh;
}
</style>
