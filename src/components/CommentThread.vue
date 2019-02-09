<template>
    <div class="media mt-3">
        <button class="minimise" @click="minimiseThread"><font-awesome-icon :icon="minimiseIcon" /></button>
        <div class="media-body" v-show="isVisible">
            <div class="comment">
                <h6 class="mt-0 beta-title row comment-title">
                    <span class="col">{{ commentThread.user.username }}&nbsp;<font-awesome-icon v-if="hasCookie" class="golden cookie" icon="cookie" /></span>
                    <span class="font14 col-md-3">{{ commentThread.comment.created_at | formatDate }}</span>
                </h6>
                <form v-if="isEditing && myComment" v-on:submit.prevent="saveEdit">
                    <textarea  v-model="commentEdit" required maxlength="10000"></textarea>
                    <button class="btn btn-light btn-sm" @click="stopEditing">Stop Editing</button>
                    <button class="btn btn-light btn-sm">Save</button>
                </form>
                <div v-else>
                    <LineBreakText :text="commentThread.comment.text"/>
                    <div v-if="loggedIn">
                        <div v-if="myComment">
                            <button class="btn btn-light btn-sm" @click="editComment">Edit</button>
                            <button class="btn btn-light btn-sm" @click="toggleReplyBox">Reply</button>
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
                    <form v-on:submit.prevent="createComment">
                        <textarea v-model="newComment" required></textarea>
                        <button class="btn btn-light float-right btn-sm">Post</button>
                    </form>
                </div>
            </div>
            <CommentThread 
                v-for="replyCommentThread in commentThread.replies" 
                :key="replyCommentThread.comment.comment_id"
                :commentThread="replyCommentThread"
                :karmaUsers="karmaUsers"
                />
        </div>
    </div>
</template>

<script>
import LineBreakText from './LineBreakText.vue'
import auth from '../services/auth.js'
import { EventBus } from '../event-bus.js';

export default {
    name: 'CommentThread',
    components: {
        LineBreakText
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
            newComment: '',
            commentEdit: ''
        }
    },
    methods: {
        createComment() {
            EventBus.$emit('newComment', {
                text: this.newComment,
                parentId: this.commentThread.comment.comment_id
            })
            this.newComment = ''
            this.showReplyBox = false
        },
        toggleReplyBox() {
            this.showReplyBox = !this.showReplyBox
        },
        minimiseThread() {
            this.isVisible = !this.isVisible;
        },
        editComment() {
            this.commentEdit = this.commentThread.comment.text
            this.isEditing = true
        },
        stopEditing() {
            this.isEditing = false
        },
        saveEdit() {
            if (this.commentEdit != this.commentThread.comment.text) {
                EventBus.$emit('editComment', {
                    commentId: this.commentThread.comment.comment_id,
                    text: this.commentEdit
                })
            }
            this.isEditing = false
        },
        showCookieModal() {
            EventBus.$emit('showCookieModal', {
                user: this.commentThread.user
            })
        }
    },
    computed: {
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
            return this.commentThread.user.user_id == localStorage.getItem('bm_user_id')
        },
        hasCookie() {
            return this.karmaUsers && this.karmaUsers.includes(this.commentThread.user.user_id)
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

</style>
