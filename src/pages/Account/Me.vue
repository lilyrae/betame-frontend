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
                <StoryItem v-for="story in stories" v-bind:key="story.story_id" v-bind:story="story">
                    <p class="float-right">
                    <!-- <button class="btn btn-outline-info small-margin">Edit</button> -->
                    <button class="btn btn-dark btn-sm" @click="showDeleteModal(story)">Delete</button>
                    </p>
                </StoryItem>
            </div>
            <div v-else>
                Why don't you create a new story?
            </div>
        </ul>
        <DeleteStoryModal @refresh="getStories"/>
    </Account>
</template>

<script>
import Account from '../../layouts/Account.vue'
import SearchNavBar from '../../components/NavBars/SearchNavBar.vue'
import TitleNavBar from '../../components/NavBars/TitleNavBar.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import StoryItem from '../../components/Lists/StoryItem.vue'
import DeleteStoryModal from '../../components/Modals/DeleteStoryModal.vue'
import story from '../../services/story.js'
import { EventBus } from '../../event-bus.js'

export default {
    name: 'Me',
    components: {
        Account,
        SearchNavBar,
        TitleNavBar,
        LoadingRipple,
        ErrorAlert,
        StoryItem,
        DeleteStoryModal
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
        this.getStories()
    },
    methods: {
        getStories() {
            this.error = null
            this.isLoadingPage = true

           story.withUserID(this.user_id)
                .then(response => {
                    this.stories = response.data
                }).catch(error => {
                    this.error = error || 'Failed to retrieve your stories'
                }).finally(() => {
                    this.isLoadingPage = false;
                });
        },
        showDeleteModal(story) {
            EventBus.$emit('showDeleteStoryModal', {story})
        }
    }
}
</script>