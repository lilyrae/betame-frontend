<template>
    <Wide>
        <div class="row top-row h-100">
            <div class="col-md-3 panel">
                <div class="user-panel text-left hide-overflow">
                    <h3 class="beta-title account-title">
                        <font-awesome-icon icon="user-astronaut" />&nbsp;{{ username }}
                    </h3>
                    <hr class="title-hr">
                    <h5 class="beta-title">
                        <router-link to="/me" class="beta-link link number-link">
                            <font-awesome-icon class="font14" icon="book-open" />&nbsp;{{ storyCount }}
                        </router-link>
                        <router-link to="/me/cookies" class="beta-link link number-link">
                            <font-awesome-icon class="golden font14" icon="cookie" />&nbsp;{{ cookieCount }}
                        </router-link>
                    </h5>
                    <hr class="title-hr">
                    <router-link class="btn betame-light-button beta-link link" to="/me/password">Change Password</router-link>
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
import user from '../services/user.js'

export default {
    name: 'Account',
    components: {
        Wide
    },
    data() {
        return {
            username: '',
            userId: null,
            cookieCount: null,
            storyCount: null
        }
    },
    created() {
        this.userId = localStorage.getItem('bm_user_id')

        user.get(this.userId)
            .then(response => {
                if (response.data) {
                    this.username = response.data.username
                    this.cookieCount = response.data.karma_count
                    this.storyCount = response.data.story_count
                }
            })
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

.number-link {
    text-decoration: none;
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

.sub-title {
    text-overflow: ellipsis;
    -webkit-text-stroke: 0.25px black;
    color: white;
    text-shadow:
        0.5px 0.5px 0 #312e2b,
        -0.25px -0.25px 0 #312e2b,  
        0.25px -0.25px 0 #312e2b,
        -0.25px 0.25px 0 #312e2b,
        0.25px 0.25px 0 #312e2b;
    overflow: hidden;
}

.fa-user-astronaut path {
  stroke: black;
  stroke-width: 25;
}

.fa-cookie path {
  stroke: black;
  stroke-width: 25;
}

.fa-book-open path {
  stroke: black;
  color: white;
  stroke-width: 50;
  -webkit-filter: brightness(100%); /* Safari */
  filter: brightness(100%);
}

.fa-book-open path:hover {
  color: #312e2b;
  stroke: white;
}

.fa-cookie path:hover {
  color: brown;
}

.link {
    margin: 4px;
}
</style>
