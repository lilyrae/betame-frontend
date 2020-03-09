<template>
  <Default class="col-md-8 offset-md-2">
    <TitleNavBar title="Leaderboard" />
    <ErrorAlert :error="error"/>
    <div class="alert alert-info" role="alert">
        <p>
            This is where we keep track our most helpful users!
            When a user reviews or comments on a story, the author may choose to gift them a cookie (basically a point).
            Here we hope to award our users for all their hard work!
        </p>
    </div>
    <div v-if="isLoadingPage">
        <center class="loading-screen">
            <div class="lds-ripple"><div></div><div></div></div>
            <div class="lds-ripple"><div></div><div></div></div>
            <div class="lds-ripple"><div></div><div></div></div>
        </center>
    </div>
    <div v-else-if="leaderboard.length > 0">
        <div class="card text-left leaderboard-card">
            <ul class="list-group list-group-flush leaderboard-list-group">
                <UserRow 
                    v-for="(user, index) in leaderboard"
                    :user="user"
                    :tag="user.tag"
                    :icon="user.icon"
                    :index="index + 1"
                    :key="index" />
            </ul>
        </div>
    </div>
    <div v-else>
        No one has given any cookies yet!
    </div>
  </Default>
</template>

<script>
import Default from '../layouts/Default.vue'
import TitleNavBar from '../components/NavBars/TitleNavBar.vue'
import UserRow from '../components/Lists/UserRow.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import user from '../services/user.js'

export default {
    name: 'LeaderBoard',
    components: {
        Default,
        TitleNavBar,
        UserRow,
        ErrorAlert
    },
    data() {
        return {
            leaderboard: [],
            error: null,
            isLoadingPage: false
        }
    },
    created() {
        this.getLeaderboard()
    },
    methods: {
        getLeaderboard() {
            this.error = null;
            this.isLoadingPage = true;

            user.top()
                .then(response => {
                    this.leaderboard = response.data
                    if (this.leaderboard.length > 0) {
                        this.leaderboard[0].tag = 'badge-warning'
                        this.leaderboard[0].icon = 'crown'
                    }
                }).catch(error => {
                    this.error = error;
                }).finally(() => {
                    this.isLoadingPage = false;
                });
        }
    }
}
</script>

<style scoped>
.purple {
    color: #7C77B9
}

.leaderboard-card {
    margin-bottom: 80px;
}
</style>
