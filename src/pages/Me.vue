<template>
    <Default>
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
    </Default>
</template>

<script>
import Default from '../templates/Default.vue'
import SearchNavBar from '../components/SearchNavBar.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import StoryItem from '../components/StoryItem.vue'
import story from '../services/story.js'

export default {
    name: 'Me',
    components: {
        Default,
        SearchNavBar,
        ErrorAlert,
        StoryItem
    },
    data() {
        return {
            stories: [],
            user_id: '',
            error: null,
            isLoadingPage: false
        }
    },
    created() {
        this.user_id = localStorage.getItem('bm_user_id');
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
.small-margin {
  margin-right: 5px;
}
</style>
