<template>
    <Wide>
        <div class="row top-row h-100">
            <div class="col-md-3 search-panel" v-if="showAdvancedSearch">
                <br>
                <SearchPanel @hide="showAdvancedSearch = false" />
            </div>
            <div :class="{'col-md-10': !showAdvancedSearch, 'offset-md-1':!showAdvancedSearch, 'col': showAdvancedSearch}">
                <br>
                <Banner/>
                <SearchNavBar :showSimpleSearch="!showAdvancedSearch" :hasAdvancedSearch="true" @toggleAdvancedSearch="showAdvancedSearch = !showAdvancedSearch"/>
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
                <PaginationNavBar />
            </div>
        </div>
    </Wide>
</template>

<script>
import Wide from '../layouts/Wide.vue'
import SearchPanel from '../components/SearchPanel'
import SearchNavBar from '../components/NavBars/SearchNavBar.vue'
import PaginationNavBar from '../components/NavBars/PaginationNavBar.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import StoryItem from '../components/Lists/StoryItem.vue'
import LoadingRipple from '../components/LoadingRipple.vue'
import Banner from '../components/Banner.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Home',
    components: {
        Wide,
        SearchNavBar,
        SearchPanel,
        PaginationNavBar,
        LoadingRipple,
        Banner,
        ErrorAlert,
        StoryItem
    },
    data() {
        return {
            filteredStories: [],
            showAdvancedSearch: false
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

@media (max-width: 768px) {
    .help-text {
        padding: 20px 0px 5px 25px;
    }
}

.betame-midbar {
    background-color: blueviolet;
}

.search-panel {
    min-width: 370px;
}
</style>

