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
                <Banner v-if="user.comment_count <= 0" :styling="['grey-banner', 'spaced-out']" title="First Step on your Journey" firstMessage="We're here to help each other out."  secondMessage="It's tough giving someone feedback on something so personal as their writing.">
                    <h5>But it's through this effort that we all improve our writing skills and enhance the community as a whole.</h5>
                    <div class="welcome-button">
                        <center>
                            <router-link :to="recommendationLink" class="btn btn-danger btn-lg"><h1>Leave Your First Comment <span><font-awesome-icon icon="heart" /></span></h1></router-link>
                        </center>
                    </div>
                    <br><br>
                    <p class="bottom-text font20">
                        Need help? Or just want to chat? Join us on 
                        <a target="_blank" class="text-info" href="https://discord.gg/G42mrwz">Discord</a> or send an email to lily@beta-me.io.
                    </p>
                </Banner>
                <div v-else>
                    <p class="no-story">Why don't you create a <router-link to="/story/new" class="text-info">new story?</router-link></p>
                </div>
            </div>
        </ul>
        <PaginationNavBar v-if="stories.length > 0" :hasNext="hasNext" :hasPrevious="hasPrevious" :page="page" @changePage="getStories" />
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
import Banner from '../../components/Banner'
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
        DeleteStoryModal,
        Banner
    },
    async created() {
        await this.getStories()
    },
    methods: {
        async getStories(page) {
            await this.$store.dispatch('account/fetchStories', page)
        }
    },
    computed: {
        ...mapGetters('api', ['success', 'error', 'isLoading']),
        ...mapGetters('account', ['user', 'stories', 'hasNext', 'hasPrevious', 'page']),
        ...mapGetters('story', ['recommendationLink'])
    }
}
</script>

<style scoped>
.welcome-button {
    margin: 90px;
}

.welcome-button h1 span {
    font-size: 85%;
}
.welcome-button h1 {
    margin-bottom: -6px;
}

.bottom-text {
    position: absolute;
    bottom: 0;
}

.no-story {
    margin-top: 50px;
}
</style>