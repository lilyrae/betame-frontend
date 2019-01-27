<template>
    <div class="media mt-3">
        <button class="minimise" @click="minimiseThread"><font-awesome-icon icon="window-minimize" /></button>
        <div class="media-body" v-show="isVisible">
            <div class="comment">
                <h6 class="mt-0 beta-title row comment-title">
                    <span class="col">{{ commentThread.user.username }}</span>
                    <span class="font14 col-md-3">{{ commentThread.comment.created_at | formatDate }}</span>
                </h6>
                <p>{{ commentThread.comment.text }}</p>
                <div>
                    <button class="btn btn-light btn-sm" v-if="loggedIn" @click="toggleReplyBox">Reply</button>
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
                @newComment="emitNewComment"
                />
        </div>
    </div>
</template>

<script>
import auth from '../services/auth.js'

export default {
    name: 'CommentThread',
    props: {
        commentThread: Object
    },
    data() {
        return {
            showReplyBox: false,
            isVisible: true,
            newComment: ''
        }
    },
    methods: {
        createComment() {
            this.$emit('newComment', {
                comment: this.newComment,
                parentId: this.commentThread.comment.comment_id
            })
            this.newComment = ''
            this.showReplyBox = false
        },
        emitNewComment({comment, parentId}) {
            this.$emit('newComment', {comment, parentId})
        },
        toggleReplyBox() {
            this.showReplyBox = !this.showReplyBox
        },
        minimiseThread() {
            this.isVisible = !this.isVisible;
        }
    },
    computed: {
        loggedIn() {
            return auth.isLoggedIn()
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

</style>
