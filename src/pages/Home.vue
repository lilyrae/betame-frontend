<template>
    <Wide>
        <div class="row top-row h-100">
            <div class="col-md-3 search-panel" v-show="showAdvancedSearch">
                <br>
                <SearchPanel @hide="showAdvancedSearch = false" />
            </div>
            <div :class="{'col-md-10': !showAdvancedSearch, 'offset-md-1':!showAdvancedSearch, 'col': showAdvancedSearch}">
                <br>
                <Banner/>
                <SearchNavBar
                    :showSimpleSearch="!showAdvancedSearch"
                    :hasAdvancedSearch="true"
                    @toggleAdvancedSearch="showAdvancedSearch = !showAdvancedSearch"/>
                <ErrorAlert :error="error"/>
                <LoadingRipple v-if="isLoading" />
                <div v-else-if="stories.length > 0">
                    <p v-if="isSearch" class="text-left help-text text-muted">Search found {{ count }} {{ 'result' | pluralise(count) }}.. &nbsp;&nbsp;&nbsp;<a class="beta-link text-info" @click="clearSearch">clear search.</a></p>
                    <!-- list of stories -->
                    <ul class="list-group list-group-flush">
                    <StoryItem v-for="story in stories" v-bind:key="story.story_id" v-bind:story="story" :canSelectTag="true"></StoryItem>
                    </ul>
                </div>
                <div v-else-if="isSearch">
                    Sorry, we couldn't find any stories for your search! <a class="beta-link text-info" @click="clearSearch">Clear search.</a>
                </div>                
                <div v-else>
                    There are no stories here yet!
                </div>
                <PaginationNavBar :hasNext="hasNext" :hasPrevious="hasPrevious" :page="page" @changePage="getStories" />
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
    methods: {
        clearSearch() {
            this.$store.commit('story/clearSearch')
            this.getStories(1)
        },
        getStories(page) {
            this.$store.dispatch('story/fetchStories', page)
        }
    },
    mounted() {
        this.getStories();
    },
    computed: {
        ...mapGetters('api', ['error', 'isLoading']),
        ...mapGetters('story', ['stories', 'isSearch', 'hasNext', 'hasPrevious', 'page', 'count'])
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

