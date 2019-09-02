<template>
    <div class="media mt-3">
        <button class="minimise" @click="minimiseThread"><font-awesome-icon :icon="minimiseIcon" /></button>
        <div class="media-body" v-show="isVisible">
            <div class="comment" :class="{ 'colour-flash': flashColour, 'colour-flash-back': flashBack }" :id="divId">
                <h6 class="mt-0 beta-title row comment-title">
                    <span v-if="commentThread.user && commentThread.user.username" class="col">{{ commentThread.user.username }}&nbsp;<font-awesome-icon v-if="hasCookie" class="golden cookie" icon="cookie" /></span>
                    <span v-else class="col font-italic">Deleted</span>
                    <span class="font16 col-md-3">{{ commentThread.comment.created_at | formatDate }}</span>
                </h6>
                <CreateComment v-if="isEditing && myComment"
                    class="edit-comment"
                    :editComment="commentThread.comment"
                    @editedComment="stopEditing"
                    />
                <div v-else-if="!deleted">
                    <vue-markdown>{{ commentThread.comment.text }}</vue-markdown>
                    <div v-if="loggedIn">
                        <div v-if="myComment">
                            <button class="btn btn-light btn-sm" @click="editComment">Edit</button>
                            <button class="btn btn-light btn-sm" @click="toggleReplyBox">Reply</button>
                            <button class="btn btn-dark btn-sm" @click="deleteComment">Delete</button>
                        </div>
                        <div v-else>
                            <button class="btn btn-light btn-sm" @click="toggleReplyBox">Reply</button>
                            <button v-if="myStory && !hasCookie" class="btn btn-light btn-sm" @click="showCookieModal">
                                Give Cookie <font-awesome-icon class="golden" icon="cookie-bite" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="new-comment" v-if="loggedIn" v-show="showReplyBox">
                    <hr>
                    <CreateComment
                        :storyId="commentThread.comment.story_id"
                        :parentId="commentThread.comment.comment_id"
                        @createdComment="toggleReplyBox"
                        />
                </div>
            </div>
            <CommentThread 
                v-for="replyCommentThread in commentThread.replies" 
                :key="replyCommentThread.comment.comment_id"
                :commentThread="replyCommentThread"
                :karmaUsers="karmaUsers"
                :myStory="myStory"
                />
        </div>
    </div>
</template>

<script>
import CreateComment from './CreateComment.vue'
import VueMarkdown from 'vue-markdown'
import auth from '../services/auth.js'
import { EventBus } from '../event-bus.js'
import { mapGetters } from 'vuex'

export default {
    name: 'CommentThread',
    components: {
        CreateComment,
        VueMarkdown
    },
    props: {
        myStory: Boolean,
        commentThread: Object,
        karmaUsers: Array
    },
    data() {
        return {
            showReplyBox: false,
            isEditing: false,
            isVisible: true,
            flashColour: false,
            flashBack: false
        }
    },
    created() {
        this.highlightRouteComment()
    },
    methods: { 
        async deleteComment() {
            await this.$store.dispatch('comments/deleteComment', this.commentThread.comment.comment_id)
            if (this.isError) {
                return
            }
            this.$store.dispatch('story/fetchStory', this.commentThread.comment.story_id)
        },
        toggleReplyBox() {
            this.showReplyBox = !this.showReplyBox
        },
        minimiseThread() {
            this.isVisible = !this.isVisible;
        },
        editComment() {
            this.isEditing = true
        },
        stopEditing() {
            this.isEditing = false
        },
        showCookieModal() {
            EventBus.$emit('showCookieModal', {
                user: this.commentThread.user
            })
        },
        highlightRouteComment() {
            setTimeout(() => {
                this.flashColour = this.commentThread.comment.comment_id == this.$route.query.comment_id
                if (this.flashColour) {
                    this.$scrollTo(`#${this.divId}`, 800, {easing: 'ease', offset: -200})
                }
            }, 200)

            setTimeout(() => {
                if (this.flashColour) {
                    this.flashBack = true
                }
                this.flashColour = false
            }, 1200)  
        }
    },
    computed: {
        ...mapGetters('comments', ['isError']),
        divId() {
            return `comment_${this.commentThread.comment.comment_id}`
        },
        loggedIn() {
            return auth.isLoggedIn()
        },
        minimiseIcon() {
            if(this.isVisible) {
                return 'window-minimize'
            } else {
                return 'plus'
            }
        },
        myComment() {
            return !this.deleted && this.commentThread.comment.user_id == auth.userId()
        },
        hasCookie() {
            return !this.deleted && this.karmaUsers && this.karmaUsers.includes(this.commentThread.comment.user_id)
        },
        deleted() {
            return this.commentThread.user == null
        }
    },
    watch: {
        '$route' () {
            this.highlightRouteComment()
        }
    }
}
</script>

<style scoped>
.comment-title span{
    margin: 3px;
}

.minimise {
  padding: 2px;
  border-radius: 5px;
  background-color: #4996a29e;
  border-color: #4996a29e;
  color: aliceblue;
}

.minimise :hover{
    cursor: pointer;
}

.media {
    padding-left: 0px;
}

.highlighted {
    box-shadow: inset 0px 0px 20px 10px #e7f9f6;
}

.colour-flash {
    background-color: #fbefcc;
    -webkit-transition: background-color 500ms ease;
    -ms-transition: background-color 500ms ease;
    transition: background-color 500ms ease;
}

.colour-flash-back {
    background-color: #ffffff7d;
    -webkit-transition: background-color 500ms ease;
    -ms-transition: background-color 500ms ease;
    transition: background-color 500ms ease;
}

.edit-comment {
    padding-bottom: 40px;
}
</style>
