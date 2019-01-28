<template>
    <Wide>
        <div class="row top-row h-100">
            <div class="col-md-3 panel">
                <div class="user-panel text-left">
                    <h3 class="beta-title account-title">
                        <font-awesome-icon icon="user-astronaut" />&nbsp;{{ username }}
                    </h3>
                    <hr class="title-hr">
                    <router-link class="btn betame-light-button" to="/me/password">Change Password</router-link>
                </div>
            </div>
            <div class="col-md-8">
                <SearchNavBar/>
                <ErrorAlert :error="error"/>
                <!-- list of my stories -->
                <ul class="list-group list-group-flush">
                    <div v-if="isLoadingPage">
                        <center class="loading-screen">
                            <div class="lds-ripple"><div></div><div></div></div>
                            <div class="lds-ripple"><div></div><div></div></div>
                            <div class="lds-ripple"><div></div><div></div></div>
                        </center>
                    </div>
                    <div v-else-if="stories.length > 0">
                        <div class="navbar navbar-light bg-light beta-innerbar title-bar">
                            <h3 class="text-left muted-title">
                                My Stories
                            </h3>
                        </div>
                        <StoryItem v-for="(story, index) in stories" v-bind:key="story.story_id" v-bind:story="story">
                            <p class="float-right">
                            <!-- <button class="btn btn-outline-info small-margin">Edit</button> -->
                            <button class="btn btn-dark btn-sm" @click="deleteStory(story.story_id, index)">Delete</button>
                            </p>
                        </StoryItem>
                    </div>
                    <div v-else>
                        Why don't you create a new story?
                    </div>
                </ul>
            </div>
        </div>
    </Wide>
</template>

<script>
import Wide from '../templates/Wide.vue'
import SearchNavBar from '../components/SearchNavBar.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import StoryItem from '../components/StoryItem.vue'
import story from '../services/story.js'

export default {
    name: 'Me',
    components: {
        Wide,
        SearchNavBar,
        ErrorAlert,
        StoryItem
    },
    data() {
        return {
            stories: [],
            user_id: '',
            error: null,
            isLoadingPage: false,
            username: ''
        }
    },
    created() {
        this.user_id = localStorage.getItem('bm_user_id');
        this.username = localStorage.getItem('bm_username');
        this.getStories();
    },
    methods: {
        getStories() {
            this.error = null;
            this.isLoadingPage = true;

           story.withUserID(this.user_id)
                .then(response => {
                    this.stories = response.data;
                }).catch(error => {
                    this.error = error;
                }).finally(() => {
                    this.isLoadingPage = false;
                });
        },
        deleteStory(id, index) {
            this.error = null;

            story.delete(id)
                .then(() => {
                    this.stories.splice(index, 1);
                }).catch(error => {
                    this.error = error;
                });
        }
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

.title-bar {
    padding: 20px;
}

.fa-user-astronaut path {
  stroke: black;
  stroke-width: 25;
}

.muted-title {
    color: rgb(202, 202, 202);
    -webkit-text-stroke: 1px #a7a4a4;
    padding-left: 25px;
    margin-bottom: 30px;
}

</style>
