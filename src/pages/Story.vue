<template>
<Default>
    <CommentAlert />
    <!-- Rating Warning -->
    <Jumbotron class="text-left" v-if="showWarning">
        <div slot="title">Warning: {{ rating.shortLabel }}</div>
        <hr>
        <p>This work has the following rating: {{ rating.label }}.</p>
        <p>If you proceed, you have agreed that you are an appropriate age for the content and are willing to see such content.</p>
        <button class="btn btn-info" @click="showWarning = false">Proceed</button>
        <router-link class="btn btn-secondary" to="/">Return Home</router-link>
    </Jumbotron>

    <!-- Loading Page -->
    <Jumbotron class="text-left" v-else-if="isLoadingPage">
        <div slot="title"><center>..Loading..</center></div>
        <br>
        <center><div class="lds-circle"><div></div></div></center>
    </Jumbotron>

    <!-- Story -->
    <Jumbotron class="text-left" v-else>
        <div slot="title" class="row">
            <p class="hide-overflow col">{{ story.title }}&nbsp;<span class="font18 beta-text"> by {{ story.user.username }}</span></p>
            <span class="font16 float-right col-md-3">{{ story.created_at | formatDate }}</span>
        </div>
        <div slot="subtitle">
            <h5 class="hide-overflow"><a @click="recordClick" class="text-info beta-link" :href="story.url" target="_blank">{{ story.url }}</a></h5>
            <hr>
        </div>
        <div>
            <p class="hide-overflow">{{ story.notes }}</p>
            <p class="font20">
                <TagList :tags="story.tags"/>
            </p>
            <p><i>{{ story.word_count }} words</i></p>
            <hr>
            <ErrorAlert :error="errorMessage" />
            <LoadingRipple v-if="isLoadingComments" />
            <Comments v-else :story="story" />
            <CookieModal
                :storyId="id"
                @refresh="getStory"
                @startLoading="startLoading"
                @commentsError="setCommentsError"
            />
        </div>
    </Jumbotron>
</Default>
</template>

<script>
import Default from '../layouts/Default.vue'
import Jumbotron from '../layouts/Jumbotron.vue'
import TagList from '../components/Lists/TagList.vue'
import Comments from '../components/Comments.vue'
import CommentAlert from '../components/CommentAlert.vue'
import CookieModal from '../components/Modals/CookieModal.vue'
import LoadingRipple from '../components/LoadingRipple.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import ratingService from '../services/rating'
import { mapGetters } from 'vuex'

const ERROR_STORY_NOT_FOUND = "Story not found."

export default {
    name: 'Story',
    components: {
        Default,
        Jumbotron,
        TagList,
        Comments,
        CommentAlert,
        CookieModal,
        LoadingRipple,
        ErrorAlert
    },
    props: {
        id: null
    },
    data() {
        return {
            isLoadingPage: false,
            isLoadingComments: false,
            errorMessage: null,
            showWarning: false
        };
    },
    async created() {
        this.isLoadingPage = true
        await this.getStory()
        this.showWarning = ratingService.requiresWarning(this.story.rating)
        this.isLoadingPage = false
    },
    methods: {
        recordClick() {
            this.$matomo.trackPageView(this.story.url)
        },
        async getStory() {
            await this.$store.dispatch('story/fetchStory', this.id)
            if (this.error && this.error === ERROR_STORY_NOT_FOUND) {
                this.$router.push('/404')
            }
        },
        startLoading() {
            this.isLoadingComments = true
        },
        setCommentsError({error}) {
            this.isLoadingComments = false
            this.errorMessage = error
        }
    },
    computed: {
        ...mapGetters('api', ['error', 'isLoading']),
        ...mapGetters('story', ['story']),
        rating() {
            if (this.story) {
                return ratingService.get(this.story.rating)
            }
            return null
        }
    },
    watch: {
        '$route' () {
            // force retrieve story when route changes from one story page to another
            this.getStory()
        },
        isLoading(val) {
            if (this.story.story_id == this.id) {
                this.isLoadingComments = val
            } else {
                this.isLoadingPage = val
                this.isLoadingComments = false
            }
        },
        error(val) {
            this.errorMessage = val
        }
    }
}
</script>

<style>
.golden {
    color: goldenrod;
}

.cookie {
    background-color: white;
    border-radius: 10px;
    margin: 1px;
}
</style>
