<template>
    <Default>
        <div class="banner jumbotron text-left">
            <h2>Beta me, Beta you <span><font-awesome-icon icon="heart" /></span></h2>
            <h5>BetaMe is a place for sharing your writing & giving and receiving feedback.</h5>
            <h5>The community welcomes all writers, from fan fiction to blog writing!</h5>
        </div>
        <SearchNavBar/>
        <ErrorAlert :error="error"/>
        <div v-if="isLoading">
            <LoadingRipple />
        </div>
        <div v-else-if="filteredStories.length > 0">
            <p class="text-left help-text text-muted">Search results..</p>
            <ul class="list-group list-group-flush">
            <StoryItem v-for="story in filteredStories" v-bind:key="story.story_id" v-bind:story="story"></StoryItem>
            </ul>
        </div>
        <div v-else-if="allStories.length > 0">
            <!-- list of stories -->
            <ul class="list-group list-group-flush">
            <StoryItem v-for="story in allStories" v-bind:key="story.story_id" v-bind:story="story"></StoryItem>
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
            filteredStories: []
        }
    },
    mounted() {
        this.$store.cache.dispatch('story/fetchStories')

        Event.$on('searching', search => {
            if(search.query == '' && search.tags.length <= 0) {
                this.filteredStories = []
                Event.$emit('finishedSearch')
                return
            }

            let i = 0
            this.filteredStories = []
            let tagIds = search.tags.map(tag => {
                return tag.tag_id
            })

            for (i = 0; i < this.allStories.length; i++) { 
                if(this.storyMatchesSearch(this.allStories[i], search.query, tagIds)) {
                    this.filteredStories.push(this.allStories[i])
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
        ...mapGetters('api', ['error', 'isLoading']),
        ...mapGetters('story', ['allStories'])
    }
}
</script>

<style scoped>
.help-text {
    padding: 20px 0px 5px 50px;
}

.banner {
    background-color: #bfdde2;
    font-family: 'Just Another Hand', cursive;
    padding: 1.2rem 1rem;
    letter-spacing: 1px;
    background-image: url('~@/assets/big-scroll.png');
    background-position: right bottom;
    background-repeat: no-repeat; 
    margin-bottom: 10px;
}

.banner h2 {
    font-size: 400%;
    padding-left: 30px;
    letter-spacing: 2px;
}

.banner h2 span {
    font-size: 10%;
}

.banner h5 {
    font-family: 'PT Sans', sans-serif;
    font-weight: 100;
    padding-left: 30px;
}

.banner div {
    padding: 10px 0;
}

@media (max-width: 768px) {
    .help-text {
        padding: 20px 0px 5px 25px;
    }

    .banner h2 {
        padding-left: 0px;
    }
}

@media (max-width: 991px) {
    .banner {
        background-image: none;
    }
}
</style>

