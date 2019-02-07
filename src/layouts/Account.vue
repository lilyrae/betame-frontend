<template>
    <Wide>
        <div class="row top-row h-100">
            <div class="col-md-3 panel">
                <div class="user-panel text-left">
                    <h3 class="beta-title account-title">
                        <font-awesome-icon icon="user-astronaut" />&nbsp;{{ username }}
                    </h3>
                    <hr class="title-hr">
                    <router-link class="btn betame-light-button link" to="/me">My Stories</router-link>
                    <router-link class="btn betame-light-button link" to="/me/cookies">My Cookies</router-link>
                    <router-link class="btn betame-light-button link" to="/me/password">Change Password</router-link>
                </div>
            </div>
            <div class="col-md-8">
                <slot></slot>
            </div>
        </div>
    </Wide>
</template>

<script>
import Wide from '../layouts/Wide.vue'

export default {
    name: 'Account',
    components: {
        Wide
    },
    data() {
        return {
            username: ''
        }
    },
    created() {
        this.username = localStorage.getItem('bm_username')
    }
}
</script>

<style scoped>
body {
    height: 100%;
}
.small-margin {
  margin-right: 5px;
}

.top-row {
    margin-top: -10px;
}

.panel {
    background-color: #bfdde2!important;
}

.user-panel {
    margin: 20px;
    margin-top: 40px;
    padding: 20px;
}

.account-title {
    text-overflow: ellipsis;
    -webkit-text-stroke: 1px black;
    color: white;
    text-shadow:
        2px 2px 0 #312e2b,
        -1px -1px 0 #312e2b,  
        1px -1px 0 #312e2b,
        -1px 1px 0 #312e2b,
        1px 1px 0 #312e2b;
    overflow: hidden;
}

.fa-user-astronaut path {
  stroke: black;
  stroke-width: 25;
}

.link {
    margin: 4px;
}
</style>
