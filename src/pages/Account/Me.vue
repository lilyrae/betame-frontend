<template>
    <Account>
        <SearchNavBar/>
        <ErrorAlert :error="error"/>
        <!-- list of my stories -->
        <ul class="list-group list-group-flush">
            <div v-if="isLoadingPage">
                <LoadingRipple />
            </div>
            <div v-else-if="stories.length > 0">
                <TitleNavBar title="My Stories" />
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
    </Account>
</template>

<script>
import Account from '../../layouts/Account.vue'
import SearchNavBar from '../../components/SearchNavBar.vue'
import TitleNavBar from '../../components/TitleNavBar.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import StoryItem from '../../components/StoryItem.vue'
import story from '../../services/story.js'

export default {
    name: 'Me',
    components: {
        Account,
        SearchNavBar,
        TitleNavBar,
        LoadingRipple,
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
        this.user_id = localStorage.getItem('bm_user_id')
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