<template>
  <Default>
    <SearchNavBar/>
    <ErrorAlert :error="error"/>
    <div v-if="isLoading">
        <LoadingRipple />
    </div>
    <div v-else-if="stories.length > 0">
        <!-- list of stories -->
        <p v-if="isFiltered" class="text-left help-text text-muted">Search results..</p>
        <ul class="list-group list-group-flush">
        <StoryItem v-for="story in stories" v-bind:key="story.story_id" v-bind:story="story"></StoryItem>
        </ul>
    </div>
    <div v-else>
        There are no stories here yet!
    </div>
    <BottomNavBar />
  </Default>
</template>

<script>
import Default from '../layouts/Default.vue'
import SearchNavBar from '../components/NavBars/SearchNavBar.vue'
import BottomNavBar from '../components/NavBars/BottomNavBar.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import StoryItem from '../components/Lists/StoryItem.vue'
import LoadingRipple from '../components/LoadingRipple.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Home',
    components: {
        Default,
        SearchNavBar,
        BottomNavBar,
        LoadingRipple,
        ErrorAlert,
        StoryItem
    },
    data() {
        return {
            stories: [],
            isFiltered: false
        }
    },
    mounted() {
        this.stories = this.allStories
        this.$store.cache.dispatch('fetchStories')

        Event.$on('searching', search => {
            if(search.query == '' && search.tags.length <= 0) {
                this.stories = this.allStories
                this.isFiltered = false
                Event.$emit('finishedSearch')
                return
            }

            this.stories = this.allStories

            this.isFiltered = true
            let i = 0
            this.stories = []
            let tagIds = search.tags.map(tag => {
                return tag.tag_id
            })

            for (i = 0; i < this.allStories.length; i++) { 
                if(this.storyMatchesSearch(this.allStories[i], search.query, tagIds)) {
                    this.stories.push(this.allStories[i])
                }
            }

            Event.$emit('finishedSearch')
        });
    },
    methods: {
        storyMatchesSearch(story, title, tagIds) {
            if (story.tags) {
                let storyTagIds = story.tags.map(tag => {
                    return tag.tag_id
                })

                for (let tagId of tagIds) {
                    if (!storyTagIds.includes(tagId)) {
                        // story does not have search tag
                        return false
                    }
                }
            } else if (tagIds.length > 0) {
                // story is not tagged
                return false
            }

            // check if story title matches
            return story.title.toLowerCase().includes(title.toLowerCase())
        }
    },
    computed: {
        ...mapGetters([
            'error',
            'isLoading',
            'allStories'
        ])
    },
    watch: {
        allStories(val) {
            this.stories = val // update story list once loaded
        }
    }
}
</script>

<style scoped>
.help-text {
    padding: 20px 0px 5px 50px;
}

@media (max-width: 768px) {
    .help-text {
        padding: 20px 0px 5px 25px;
    }
}

.banner {
    background-color: #bfdde2;
    font-family: 'Just Another Hand', cursive;
    padding: 2rem 1rem;
    letter-spacing: 1px;
}

@media (min-width: 768px) {
    .banner {
        padding: 2rem 2rem;
    }
}

</style>
