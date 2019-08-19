<template>
    <Account>
        <br>
        <SearchNavBar/>
        <ErrorAlert :error="error"/>
        <Alert :message="success"/>
        <!-- list of my stories -->
        <ul class="list-group list-group-flush">
            <div v-if="isLoading">
                <LoadingRipple />
            </div>
            <div v-else-if="stories.length > 0">
                <TitleNavBar title="My Stories" />
                <StoryItem v-for="story in stories" v-bind:key="story.story_id" v-bind:story="story">
                    <p class="float-right">
                    <button class="btn btn-outline-info small-margin btn-sm" @click="redirectToEditPage(story)">Edit</button>
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
import Alert from '../../components/Alert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import StoryItem from '../../components/Lists/StoryItem.vue'
import DeleteStoryModal from '../../components/Modals/DeleteStoryModal.vue'
import { EventBus } from '../../event-bus.js'
import { mapGetters } from 'vuex'

export default {
    name: 'Me',
    components: {
        Account,
        SearchNavBar,
        TitleNavBar,
        LoadingRipple,
        ErrorAlert,
        Alert,
        StoryItem,
        DeleteStoryModal
    },
    created() {
        this.getStories()
    },
    methods: {
        getStories() {
            this.$store.cache.dispatch('account/fetchStories')
        },
        showDeleteModal(story) {
            this.$store.commit('api/success', null)
            EventBus.$emit('showDeleteStoryModal', {story})
        },
        redirectToEditPage(story) {
            this.$store.commit('api/success', null)
            this.$store.commit('story/story', story)
            this.$router.push(`/story/edit/${story.story_id}`)
        }
    },
    computed: {
        ...mapGetters('api', ['success', 'error', 'isLoading']),
        ...mapGetters('account', ['stories']),
    }
}
</script>