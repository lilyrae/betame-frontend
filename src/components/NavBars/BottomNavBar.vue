<template>
    <nav class="navbar fixed-bottom navbar-light bg-light text-right">
        <div>
            <router-link to="/about" class="navbar-text betame-navbar-text">About Us</router-link>
            <router-link to="/terms" class="navbar-text betame-navbar-text">Terms of Service</router-link>
            <router-link to="/privacy" class="navbar-text betame-navbar-text">Privacy Policy</router-link>
        </div>
    </nav>
</template>

<script>
import BaseNavBar from './BaseNavBar'

export default {
    name: 'BottomNavBar',
    components: {
        BaseNavBar
    }
}
</script>

<style scoped>
.betame-navbar-text {
    padding-left: 15px;
    padding-right: 15px;
}
</style>
