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
                <div v-else>
                    There are no stories here yet!
                </div>
            </div>
        </div>
    </Wide>
</template>

<script>
import Wide from '../layouts/Wide.vue'
import StoryItem from '../components/Lists/StoryItem.vue'
import LoadingRipple from '../components/LoadingRipple.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import { mapGetters } from 'vuex'
import storyService from '../services/story'
import userService from '../services/user'

export default {
    name: 'User',
    components: {
        Wide,
        StoryItem,
        LoadingRipple,
        ErrorAlert
    },
    props: {
        id: null
    },
    data() {
        return {
            user: null,
            stories: []
        }
    },
    async created() {
        const id = this.id.split('.')
        const userId = id && id.length > 0 ? id[id.length - 1] : null

        if (!userId || isNaN(userId)) {
            this.$store.commit('api/error', 'Could not find user id.')
            return
        }

        this.$store.commit('api/error', null)
        this.$store.commit('api/isLoading', true)
        
        try {
            const response = await userService.get(userId)
            this.user = response.data
            const storyResponse =  await storyService.withUserID(userId)
            this.stories =  storyResponse.data
        } catch (err) {
            this.$store.commit('api/error', err || 'Failed to get user and their stories.')
        }

        this.$store.commit('api/isLoading', false)
    },
    computed: {
        ...mapGetters('api', ['error', 'isLoading'])
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
