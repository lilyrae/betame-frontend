<template>
<div>
    <Jumbotron v-if="isLoading">
        <br>
        <center><div class="lds-circle"><div></div></div></center>
    </Jumbotron>
    <Jumbotron v-else-if="error">
        <span slot="title">Error</span>
        <ErrorAlert :error="error"/>
        <p>We couldn't retrieve your account details!</p>
    </Jumbotron>
    <Jumbotron v-else-if="createdEverything">
        <span slot="title">Success!</span>
        <p> Thank you for submitting to BetaMe. You can take a look at all your works in My Works.</p>
        <p>
            <router-link class="btn btn-lg btn-success" to="/me">
                My Works&nbsp;
                <font-awesome-icon icon="book-open" />
            </router-link>
        </p>
    </Jumbotron>
    <Jumbotron v-else-if="createdStory">
        <span slot="title">Add Tags</span>
        <span slot="subtitle">
            <h5 class="beta-title">These will help reviewers find your work.</h5>
        </span>
        <br>
        <StoryTagForm :storyId="storyId" ref="storyTagForm">
            <center>
                <button type="button" @click="addTags" class="btn btn-lg betame-dark-button">Add</button>&nbsp;
                <button type="button" @click="finishedAddingTags" class="btn btn-lg betame-dark-button">Skip</button>
            </center>
        </StoryTagForm>
    </Jumbotron>
    <Jumbotron v-else-if="user && user.points < storyPrice">
        <span slot="title"><i>Before You</i> Create a Story</span>
        <span slot="subtitle">
            <h5 class="beta-title">You need more tea <font-awesome-icon icon="mug-hot" /></h5>
        </span>
        <br>
        <p>When you leave feedback on someone else's story, you earn a cuppa, allowing you to post a story.</p>
        <p>(Make sure the comment is left as a <strong><u>direct response</u></strong> to the story, and <strong><u>not as a reply</u></strong> to another comment.)</p>
        <br>
        <router-link :to="recommendationLink" class="btn btn-danger">Leave Feedback <font-awesome-icon icon="heart" /></router-link>
    </Jumbotron>
    <Jumbotron v-else>
        <span slot="title">Create New Story</span>
        <br>
        <StoryForm></StoryForm>
    </Jumbotron>
</div>
</template>

<script>
import Jumbotron from '../layouts/Jumbotron.vue'
import StoryForm from '../components/Forms/StoryForm.vue'
import StoryTagForm from '../components/Forms/StoryTagForm.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'CreateStory',
    components: {
        Jumbotron,
        StoryForm,
        StoryTagForm
    },
    data() {
        return {
            createdStory: false,
            createdEverything: false,
            storyId: null,
            story: {}
        }
    },
    async mounted() {
        this.storyId = null;
        this.story = {};

        await this.$store.dispatch('account/fetchUser')

        Event.$on('createdStory', story => {
            this.createdStory = true;
            this.storyId = story.story_id.toString();
            this.story = story;
        })
        Event.$on('addedTagsToStory', () => {
            this.finishedAddingTags();
        })
    },
    methods: {
        finishedAddingTags() {
            this.createdEverything = true;
        },
        addTags() {
            this.$refs.storyTagForm.addTags();
        }
    },
    computed: {
        ...mapGetters('account', ['user', 'storyPrice']),
        ...mapGetters('api', ['isLoading', 'error']),
        ...mapGetters('story', ['recommendationLink'])
    }
}
</script>

<style scoped>
.karma-box {
    width: 300px;
}
</style>