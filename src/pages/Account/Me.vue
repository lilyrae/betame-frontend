<template>
    <Account>
        <br>
        <ErrorAlert :error="error"/>
        <Alert :message="success"/>
        <!-- list of my stories -->
        <ul class="list-group list-group-flush">
            <div v-if="isLoading">
                <LoadingRipple />
            </div>
            <div v-else-if="stories.length > 0">
                <TitleNavBar title="My Stories" />
                <MyStoryItem v-for="story in stories" v-bind:key="story.story_id" v-bind:story="story" />
            </div>
            <div v-else>
                Why don't you create a new story?
            </div>
        </ul>
        <PaginationNavBar :hasNext="hasNext" :hasPrevious="hasPrevious" :page="page" @changePage="getStories" />
        <StoryPrivacyModal />
        <DeleteStoryModal @refresh="getStories"/>
    </Account>
</template>

<script>
import Account from '../../layouts/Account.vue'
import TitleNavBar from '../../components/NavBars/TitleNavBar.vue'
import PaginationNavBar from '../../components/NavBars/PaginationNavBar.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import Alert from '../../components/Alert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import MyStoryItem from '../../components/Lists/MyStoryItem.vue'
import StoryPrivacyModal from '../../components/Modals/StoryPrivacyModal.vue'
import DeleteStoryModal from '../../components/Modals/DeleteStoryModal.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Me',
    components: {
        Account,
        TitleNavBar,
        PaginationNavBar,
        LoadingRipple,
        ErrorAlert,
        Alert,
        MyStoryItem,
        StoryPrivacyModal,
        DeleteStoryModal
    },
    created() {
        this.getStories()
    },
    methods: {
        getStories(page) {
            this.$store.dispatch('account/fetchStories', page)
        }
    },
    computed: {
        ...mapGetters('api', ['success', 'error', 'isLoading']),
        ...mapGetters('account', ['stories', 'hasNext', 'hasPrevious', 'page']),
    }
}
</script>