<template>
    <Account>
        <TitleNavBar class="big-margin" title="My Cookies" />
        <ErrorAlert :error="error"/>
        <!-- list of my stories -->        
        <div v-if="isLoadingPage">
            <LoadingRipple />
        </div>
        <div v-else-if="cookies.length > 0" class="row justify-content-center">
            <div v-for="(cookie, index) in cookies" v-bind:key="cookie.karma_id">
                <div class="card beta-card">
                    <div class="beta-card-top bg-light">
                        <p class="text-left">
                            <span v-for="count in (index + 1)" :key="count">
                                <font-awesome-icon class="golden" icon="cookie" />
                            </span>
                        </p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title beta-title text-left">From {{ cookie.from_user.username }}</h5>
                        <p class="card-text">{{ cookie.message }}</p>
                        <router-link :to="storyLink(cookie)" class="btn btn-info">Revisit their Story</router-link>
                    </div>
                </div>
            </div>
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
import TitleNavBar from '../../components/TitleNavBar.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import karma from '../../services/karma.js'

export default {
    name: 'Me',
    components: {
        Account,
        TitleNavBar,
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
        },
        storyLink(karma) {
            return '/story/' + karma.story_id
        },
        cookieCount(index) {
            return index + 1
        }
    }
}
</script>

<style>
.beta-card-top {
    min-height: 10px;
}

.beta-card {
    margin: 10px;
    border-radius: 10px;
    width: 243px;
}

.cookie-award {
    margin: 40px;
}
</style>
