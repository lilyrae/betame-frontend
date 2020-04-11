<template>
    <Wide>
        <div class="row top-row h-100">
            <div class="col-md-3 panel">
                <div class="user-panel text-left">
                    <h5 class="beta-title karma-box" :class="{'bg-dark': (user.points < 0), 'text-light': (user.points < 0), 'bg-light': (user.points >= 0)}">
                        <center>{{ user.points }} {{ 'cup' | pluralise(user.points) }} of tea
                            <div class="betame-tooltip"><font-awesome-icon icon="mug-hot" class="text-grey" />
                                <span class="betame-tooltiptext font16" v-if="user.points >= storyPrice">
                                    With this tea, you can publish {{ user.points / storyPrice }} story.
                                </span>
                                <span class="betame-tooltiptext font16" v-else>
                                    You will need to leave more feedback before you can publish your story!
                                </span>
                            </div>
                        </center>
                    </h5>
                    <p class="karma-helper font16 text-muted" @click="showPointsModal = true">What is tea and how can I get more?</p>
                    <hr class="title-hr">
                    <h3 class="beta-title account-title">
                        <font-awesome-icon icon="user-astronaut" />&nbsp;{{ user.username }}
                    </h3>
                    <hr class="title-hr">
                    <h5 class="beta-title hide-overflow user-details">
                        <p>
                            <router-link to="/me" class="beta-link link number-link">
                                <font-awesome-icon class="font16" icon="book-open" />&nbsp;{{ count }} Stories
                            </router-link>
                        </p>
                        <p>
                            <router-link to="/me/cookies" class="beta-link link number-link">
                                <font-awesome-icon class="golden font16" icon="cookie" />&nbsp;{{ user.karma_count || 0 }} Cookies
                            </router-link> 
                        </p>
                        <p>
                            <router-link to="/me/notifications" class="beta-link link number-link">
                                <font-awesome-icon class="font16" icon="bell" />&nbsp;{{ notifications.length }} Notifications
                            </router-link> 
                        </p>
                    </h5>
                    <hr class="title-hr">
                    <router-link class="btn btn-secondary" to="/me/password">Change Password</router-link>
                    <hr class="title-hr">
                </div>
            </div>
            <div class="col-md-9">
                <slot></slot>
            </div>
        </div>
        <PointsModal :showModal="showPointsModal" @close="showPointsModal = false" />
    </Wide>
</template>

<script>
import Wide from '../layouts/Wide.vue'
import PointsModal from '../components/Modals/PointsModal'
import { mapGetters } from 'vuex'

export default {
    name: 'Account',
    components: {
        Wide,
        PointsModal
    },
    data() {
        return {
            showPointsModal: false
        }
    },
    created() {
        this.$store.dispatch('account/fetchUser')
    },
    computed: {
        ...mapGetters('account', ['user', 'storyPrice', 'count']),
        ...mapGetters('notification', ['notifications'])
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

@media (min-width: 768px) {
    .panel {
        min-height: 93.5vh;
    }
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

.karma-box {
    padding: 10px;
    border: 1px dashed #312e2b;
    -webkit-box-shadow: 0 0 0 3px #c5c9c9, 0 0 0 5px #312e2b, 0 0 0 10px #fff, 0 0 2px 10px #000000;
    box-shadow: 0 0 0 3px #c5c9c9, 0 0 0 5px #312e2b, 0 0 0 10px #fff, 0 0 2px 10px #000000;
}

.karma-helper {
    margin-top: 15px;
    margin-bottom: 40px;
    text-decoration: underline;
    cursor: pointer;
}

.user-details p {
    margin-bottom: 30px;
}
</style>
