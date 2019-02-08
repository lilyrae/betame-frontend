<template>
  <Jumbotron class="text-left">
    <ErrorAlert :error="error" />
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
    <br>
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
import TagList from '../components/TagList.vue'
import Comments from '../components/Comments.vue'
import CookieModal from '../components/CookieModal.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import story from '../services/story.js'

export default {
    name: 'Story',
    components: {
        Jumbotron,
        TagList,
        Comments,
        CookieModal,
        ErrorAlert
    },
    props: {
        id: null
    },
    data() {
        return {
            story: {
                user: {},
                comments: []
            },
            isLoadingPage: false,
            error: null
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
            this.isLoadingPage = true;
            story.byId(this.id)
                .then((response) => {
                    this.story = response.data;
                    document.title = this.story.title + ' - Beta me.';
                }).catch(() => {
                    this.$router.push('/404')
                }).finally(() => {
                    this.isLoadingPage = false;
                })
        },
        startLoading() {
            this.isLoadingPage = true
        },
        setCommentsError({error}) {
            this.isLoadingPage = false
            this.error = error
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
