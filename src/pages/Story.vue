<template>
  <Jumbotron class="text-left">
    <div slot="title">
        <span v-if="isLoadingPage">
            <center>..Loading..</center>
        </span>
        <span v-else class="row">
            <p class="hide-overflow col">{{ story.title }}&nbsp;<span class="font18 beta-text"> by {{ story.user.username }}</span></p>
            <span class="font14 float-right col-md-3">{{ story.created_at | formatDate }}</span>
        </span>
    </div>
    <div slot="subtitle">
        <span v-if="!isLoadingPage">
            <h5 class="hide-overflow"><a @click="recordClick" class="text-info beta-link" :href="story.url" target="_blank">{{ story.url }}</a></h5>
        </span>
        <hr>
    </div>
    <div>
        <div v-if="isLoadingPage">
            <center><div class="lds-circle"><div></div></div></center>
        </div>
        <div v-else>
            <p class="hide-overflow">{{ story.notes }}</p>
            <p>
                <TagList :tags="story.tags"/>
            </p>
            <p><i>{{ story.word_count }} words</i></p>
        </div>
    </div>
    <hr>
    <ErrorAlert :error="errorMessage" />
    <LoadingRipple v-if="isLoadingComments" />
    <Comments
        :story="story"
        @refresh="getStory"
        @startLoading="startLoading"
        @commentsError="setCommentsError"/>
    <CookieModal
        :storyId="id"
        @refresh="getStory"
        @startLoading="startLoading"
        @commentsError="setCommentsError"
    />
  </Jumbotron>
</template>

<script>
import Jumbotron from '../layouts/Jumbotron.vue'
import TagList from '../components/Lists/TagList.vue'
import Comments from '../components/Comments.vue'
import CookieModal from '../components/Modals/CookieModal.vue'
import LoadingRipple from '../components/LoadingRipple.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Story',
    components: {
        Jumbotron,
        TagList,
        Comments,
        CookieModal,
        LoadingRipple,
        ErrorAlert
    },
    props: {
        id: null,
        comment_id: null
    },
    data() {
        return {
            isLoadingPage: false,
            isLoadingComments: false,
            errorMessage: null
        };
    },
    created() {
        this.getStory()
    },
    methods: {
        recordClick() {
            this.$matomo.trackPageView(this.story.url)
        },
        getStory() {
            this.$store.dispatch('story/fetchStory', this.id)
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
        ...mapGetters('story', ['story'])
    },
    watch: {
        '$route' () {
            // force retrieve story when route changes from one story page to another
            this.getStory()
            console.log(this.comment_id)
            console.log(this.$route.query)
        },
        isLoading(val) {
            if (this.story.story_id == this.id) {
                this.isLoadingPage = false
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
