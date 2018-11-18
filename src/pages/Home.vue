<template>
  <Default>
    <SearchNavBar/>
    <ErrorAlert :error="error"/>
    <!-- list of stories -->
    <ul class="list-group list-group-flush">
      <StoryItem v-for="story in stories" v-bind:key="story.story_id" v-bind:story="story"></StoryItem>
    </ul>
    <!-- no stories -->
    <div v-show="stories.length <= 0">
        There are no stories here yet!
    </div>
    <BottomNavBar />
  </Default>
</template>

<script>
import Default from '../templates/Default.vue'
import SearchNavBar from '../components/SearchNavBar.vue'
import BottomNavBar from '../components/BottomNavBar.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import StoryItem from '../components/StoryItem.vue'
import story from '../services/story.js'

export default {
    name: 'Home',
    components: {
        Default,
        SearchNavBar,
        BottomNavBar,
        ErrorAlert,
        StoryItem
    },
    data() {
        return {
            stories: [],
            allStories: [],
            error: null
        }
    },
    mounted() {
        this.getStories();

        Event.$on('searching', search => {
            if(search.query == '') {
                this.stories = this.allStories;
                Event.$emit('finishedSearch');
                return;
            }
            let i = 0;
            this.stories = [];

            for (i = 0; i < this.allStories.length; i++) { 
                if(this.allStories[i].title.toLowerCase().includes(search.query.toLowerCase())) {
                    this.stories.push(this.allStories[i]);
                }
            }

            Event.$emit('finishedSearch');
        });
    },
    methods: {
        getStories() {
            this.error = null;
            
            story.all()
                .then(response => {
                    this.stories = response.data;
                    this.allStories = response.data;
                }).catch(error => {
                    this.error = error;
                });
        }
    }
}
</script>

<style scoped>

</style>
