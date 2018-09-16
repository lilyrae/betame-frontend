<template>
    <Jumbotron>
        <span slot="title">
            <span v-if="createdEverything"></span>
            <span v-else-if="createdStory">Add Tags to Your Story</span>
            <span v-else>Create New Story</span>
        </span>
        <div v-if="createdEverything">
            <p>Success! Your work has been created.</p>
            <h3 class="beta-title">
                {{ story.title }}
            </h3>
            <br>
            <p>
                <router-link class="btn btn-lg btn-success" to="/me">
                    My Works&nbsp;
                    <i class="fas fa-book-open"></i>
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
import Jumbotron from '../templates/Jumbotron.vue'
import StoryForm from '../components/StoryForm.vue'
import StoryTagForm from '../components/StoryTagForm.vue'

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
        Event.$on('createdStory', story => {
            this.createdStory = true;
            this.storyId = story.story_id;
            this.story = story;
        })
        Event.$on('addedTagsToStory', story => {
            this.createdEverything = true;
        })
    }
}
</script>