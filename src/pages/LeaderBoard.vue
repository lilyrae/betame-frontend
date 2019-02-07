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
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-1"><span class="badge badge-info">1</span></div>
                        <div class="col-5 col-md-7">{{ leaderboard[0].username }}&nbsp;&nbsp;&nbsp;<span class="badge badge-warning"><font-awesome-icon icon="crown" /> winning</span></div>
                        <div class="col-3 col-md-2"><font-awesome-icon class="purple" icon="comments" />&nbsp;{{ leaderboard[0].comments }}</div>
                        <div class="col-3 col-md-2"><font-awesome-icon class="golden" icon="cookie" />&nbsp;{{ leaderboard[0].karma }}</div>
                    </div>
                </li>
                <li class="list-group-item" v-for="(user, index) in leaderboard" :key="user.username">
                    <div class="row">
                        <div class="col-1"><span class="badge badge-info">{{ index + 2 }}</span></div>
                        <div class="col-5 col-md-7">{{ user.username }}</div>
                        <div class="col-3 col-md-2"><font-awesome-icon class="purple" icon="comments" />&nbsp;{{ user.comments }}</div>
                        <div class="col-3 col-md-2"><font-awesome-icon class="golden" icon="cookie" />&nbsp;{{ user.karma }}</div>
                    </div>
                </li>
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
import TitleNavBar from '../components/TitleNavBar.vue'
import ErrorAlert from '../components/ErrorAlert.vue'

export default {
    name: 'LeaderBoard',
    components: {
        Default,
        TitleNavBar,
        ErrorAlert
    },
    data() {
        return {
            leaderboard: [],
            error: null,
            isLoadingPage: false
        }
    },
    mounted() {
        this.firstUser =             {
                username: 'Lily hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
                karma: 100,
                comments: 10
            }
        this.leaderboard = [
            {
                username: 'Nesh',
                karma: 20,
                comments: 10
            },
            {
                username: 'Alice',
                karma: 5,
                comments: 10
            }
        ]
    },
    methods: {
        getLeaderboard() {
            this.error = null;
            this.isLoadingPage = true;
            
            // ge
        }
    }
}
</script>

<style scoped>
.purple {
    color: #7C77B9
}

</style>
