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
        :comments="story.comments"
        :storyId="id"
        :karmaUsers="karmaUsers"
        @refresh="getStory"
        @startLoading="startLoading"
        @commentsError="setCommentsError"/>
    <Modal :isVisible="showCookieModal" v-if="cookieUser">
        <template slot="header">Give a Cookie to {{ cookieUser.username }}</template>
        <p class="font18">To say thank you for reviewing your story, give your beta a cookie! You can also add a message to make it an extra special treat.</p>
        <textarea class="form-control beta-textarea" v-show="addMessage" v-model="cookieMessage"></textarea>
        <template slot="footer">
            <button v-if="!addMessage" @click="addMessage = true" class="btn">Add Message <font-awesome-icon class="betame-red" icon="heart" /></button>
            <button class="btn" @click="sendCookie">
                <span v-if="!addMessage">Give Cookie</span>
                <span v-else>Send&nbsp;<font-awesome-icon class="betame-red" icon="heart" /></span>
                &nbsp;<font-awesome-icon class="golden" icon="cookie-bite" />
            </button>
        </template>
    </Modal>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../layouts/Jumbotron.vue'
import TagList from '../components/TagList.vue'
import Comments from '../components/Comments.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import Modal from '../components/Modal.vue'
import story from '../services/story.js'
import karma from '../services/karma.js'
import { EventBus } from '../event-bus.js';
import { format } from 'date-fns'

export default {
    name: 'Story',
    components: {
        Jumbotron,
        TagList,
        Comments,
        ErrorAlert,
        Modal
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
            error: null,
            showCookieModal: false,
            addMessage: false,
            cookieMessage: '',
            cookieUser: null,
            isAnonymousCookie: false
        };
    },
    created() {
        this.getStory()

        EventBus.$on('showCookieModal', ({user}) => {
            this.cookieUser = user
            this.showCookieModal = true
        })

        EventBus.$on('closeModal', () => {
            this.closeCookieModal()
        })
    },
    methods: {
        recordClick() {
            this.$matomo.trackPageView(this.story.url)
        },
        closeCookieModal() {
            this.showCookieModal = false
            this.addMessage = false
            this.cookieMessage = ''
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
        sendCookie() {
            this.isLoadingPage = true

            karma.create(this.id, this.cookieUser.user_id, this.cookieMessage, this.isAnonymousCookie)
                .then(() => {
                    // TO DO show success
                    this.isLoadingPage = false
                    this.closeCookieModal()
                    this.getStory()
                }).catch((error) => {
                    this.isLoadingPage = false
                    this.error = error
                })
        },
        startLoading() {
            this.isLoadingPage = true
        },
        setCommentsError({error}) {
            this.isLoadingPage = false
            this.error = error
        }
    },
    computed: {
        karmaUsers() {
            if (!this.story.karma) {
                return null
            }

            return this.story.karma.map(karma => {
                return karma.to_user_id
            })
        }
    },
    filters: {
        formatDate(date) {
            return format(date, 'Do MMMM YYYY');
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
