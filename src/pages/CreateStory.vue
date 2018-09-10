<template>
    <Jumbotron>
        <span slot="title">
            <span v-if="createdEverything">Success!</span>
            <span v-else-if="createdStory">Add Tags to Your Story</span>
            <span v-else>Create New Story</span>
        </span>
        <div v-if="createdEverything">
            Your story has been created:
        </div>
        <div v-else-if="createdStory">
            <StoryTagForm :storyId="storyId"></StoryTagForm>
        </div>
        <div v-else>
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
            storyId: null
        }
    },
    mounted() {
        Event.$on('createdStory', story => {
            this.createdStory = true;
            this.storyId = story.story_id;
        })
    }
}
</script>