<template>
  <Default class="col-md-8 offset-md-2">
    <TitleNavBar title="Leaderboard" />
    <ErrorAlert :error="error"/>
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
                <UserRow :user="firstUser" tag="winning" icon="crown" :index="1" />
                <UserRow v-for="(user, index) in leaderboard" :user="user" :index="index + 2" :key="index" />
            </ul>
        </div>

    </div>
    <div v-else>
        No one has give any cookies yet!
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
            firstUser: {},
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
                    this.leaderboard = response.data;
                    if (this.leaderboard.length > 0) {
                        this.firstUser = this.leaderboard.shift()
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

</style>
