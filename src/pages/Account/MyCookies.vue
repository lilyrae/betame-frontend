<template>
    <Account>
        <TitleNavBar class="big-margin" title="My Cookies" />
        <ErrorAlert :error="error"/>
        <!-- list of my stories -->        
        <div v-if="isLoadingPage">
            <LoadingRipple />
        </div>
        <div v-else-if="cookies.length > 0" class="justify-content-center">
            <CookieCard v-for="cookie in cookies" v-bind:key="cookie.karma_id" :cookie="cookie" />
        </div>
        <div v-else>
            <p>You don't have any cookies yet!</p>
            <p>
                Why don't try leaving a comment on someone else's story.
                They might just gift you a cookie..
                <font-awesome-icon class="betame-red" icon="heart" />
            </p>
        </div>
    </Account>
</template>

<script>
import Account from '../../layouts/Account.vue'
import TitleNavBar from '../../components/NavBars/TitleNavBar.vue'
import CookieCard from '../../components/Lists/CookieCard.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import karma from '../../services/karma.js'

export default {
    name: 'Me',
    components: {
        Account,
        TitleNavBar,
        CookieCard,
        LoadingRipple,
        ErrorAlert
    },
    data() {
        return {
            cookies: [],
            error: null,
            isLoadingPage: false
        }
    },
    created() {
        this.getCookies()
    },
    methods: {
        getCookies() {
            this.error = null;
            this.isLoadingPage = true;

           karma.getForCurrentUser()
                .then(response => {
                    this.cookies = response.data;
                }).catch(error => {
                    this.error = error;
                }).finally(() => {
                    this.isLoadingPage = false;
                });
        }
    },
    watch: {
        '$route' () {
            this.highlightRouteComment()
        }
    }
}
</script>

<style>

</style>
