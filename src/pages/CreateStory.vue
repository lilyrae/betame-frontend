<template>
    <Jumbotron>
        <span slot="title">
            <span v-if="createdEverything">Success!</span>
            <span v-else-if="createdStory">Add Tags</span>
            <span v-else>Create New Story</span>
        </span>
        <span slot="subtitle" v-if="createdStory && !createdEverything">
            <h5 class="beta-title">
                These will help reviewers find your work.
            </h5>
        </span>
        <div v-if="createdEverything">
            <p> Thank you for submitting to BetaMe. You can take a look at all your works in My Works.</p>
            <p>
                <router-link class="btn btn-lg btn-success" to="/me">
                    My Works&nbsp;
                    <font-awesome-icon icon="book-open" />
                </router-link>
            </p>
        </div>
        <div v-else-if="createdStory">
            <br>
            <StoryTagForm :storyId="storyId"></StoryTagForm>
        </div>
        <div v-else>
            <br>
            <StoryForm></StoryForm>
        </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../layouts/Jumbotron.vue'
import StoryForm from '../components/Forms/StoryForm.vue'
import StoryTagForm from '../components/Forms/StoryTagForm.vue'

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
    mounted() {
        this.storyId = null;
        this.story = {};

        Event.$on('createdStory', story => {
            this.createdStory = true;
            this.storyId = story.story_id;
            this.story = story;
        })
        Event.$on('addedTagsToStory', () => {
            this.createdEverything = true;
        })
    }
}
</script>

<style scoped>
@media screen and (max-device-width : 480px){
    .celebration-image {
        width: 200px;
    }
}
</style>
