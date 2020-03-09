<template>
    <Wide>
        <div class="row top-row panel">
            <div class="col-md-8 offset-md-2">
                <div class="user-panel text-left hide-overflow">
                    <p class="beta-title" v-if="user">
                        <span class="account-title font18">
                            <font-awesome-icon icon="user-astronaut" />&nbsp;{{ user.username }}
                        </span>
                        <span>
                            <font-awesome-icon class="font16" icon="book-open" />&nbsp;{{ user.story_count }}
                            <font-awesome-icon class="golden font16" icon="cookie" />&nbsp;{{ user.karma_count }}
                        </span>
                    </p>
                    <hr class="title-hr">
                </div>
            </div>
        </div>
        <div class="row h-100">
            <div class="col-md-8 offset-md-2">
                <br>
                <ErrorAlert :error="error"/>
                <LoadingRipple v-if="isLoading" />
                <div v-if="stories.length > 0">
                    <ul class="list-group list-group-flush">
                        <StoryItem v-for="story in stories" v-bind:key="story.story_id" v-bind:story="story"></StoryItem>
                    </ul>
                </div>
                <div v-else-if="!isLoading">
                    There are no stories here yet!
                </div>
                <PaginationNavBar :hasNext="hasNext" :hasPrevious="hasPrevious" :page="page" @changePage="getStories" />
            </div>
        </div>
    </Wide>
</template>

<script>
import Wide from '../layouts/Wide.vue'
import StoryItem from '../components/Lists/StoryItem.vue'
import PaginationNavBar from '../components/NavBars/PaginationNavBar'
import LoadingRipple from '../components/LoadingRipple.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import { mapGetters } from 'vuex'
import storyService from '../services/story'
import userService from '../services/user'
import pagination from '../services/pagination'

export default {
    name: 'User',
    components: {
        Wide,
        StoryItem,
        PaginationNavBar,
        LoadingRipple,
        ErrorAlert
    },
    props: {
        id: null
    },
    data() {
        return {
            userId: null,
            user: null,
            stories: [],
            page: 1,
            count: 0,
            limit: 3
        }
    },
    async created() {
        const id = this.id.split('.')
        this.userId = id && id.length > 0 ? id[id.length - 1] : null

        if (!this.userId || isNaN(this.userId)) {
            this.$store.commit('api/error', 'Could not find user id.')
            return
        }

        this.$store.commit('api/error', null)
        this.$store.commit('api/isLoading', true)
        
        try {
            const response = await userService.get(this.userId)
            this.user = response.data
            this.getStories()
        } catch (err) {
            this.$store.commit('api/error', err || 'Failed to get user.')
        }

        this.$store.commit('api/isLoading', false)
    },
    methods: {
        async getStories(page) {
            if (page) {
                this.page = page;
            }

            this.$store.commit('api/error', null)
            this.$store.commit('api/isLoading', true)
            
            try {
                const response =  await storyService.withUserID(
                    this.userId, this.limit, pagination.offset(this.page, this.limit)
                )
                this.stories =  response.data.stories
                this.count = response.data.count
            } catch (err) {
                this.$store.commit('api/error', err || 'Failed to get user\'s stories.')
            }

            this.$store.commit('api/isLoading', false)
        }
    },
    computed: {
        ...mapGetters('api', ['error', 'isLoading']),
        hasNext() {
            return pagination.hasNext(this.page, this.limit, this.count)
        },
        hasPrevious() {
            return pagination.hasPrevious(this.page, this.limit)
        }
    }
}
</script>

<style scoped>
body {
    height: 100%;
}
.small-margin {
  margin-right: 5px;
}

.top-row {
    margin-top: -10px;
}

.panel {
    background-color: #B4CDED!important;
}

.user-panel {
    margin: 20px;
    margin-top: 40px;
    padding: 20px;
}

.number-link {
    text-decoration: none;
}

.account-title {
    font-size: 1.75rem;
    text-overflow: ellipsis;
    -webkit-text-stroke: 1px black;
    color: white;
    text-shadow:
        2px 2px 0 #312e2b,
        -1px -1px 0 #312e2b,  
        1px -1px 0 #312e2b,
        -1px 1px 0 #312e2b,
        1px 1px 0 #312e2b;
    overflow: hidden;
}

.fa-user-astronaut path {
  stroke: black;
  stroke-width: 25;
}

.fa-cookie path {
  stroke: black;
  stroke-width: 25;
}

.fa-book-open path {
  stroke: black;
  color: white;
  stroke-width: 50;
  -webkit-filter: brightness(100%); /* Safari */
  filter: brightness(100%);
}

</style>
