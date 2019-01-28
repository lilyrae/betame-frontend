<template>
    <div class="media mt-3">
        <button class="minimise" @click="minimiseThread"><font-awesome-icon :icon="minimiseIcon" /></button>
        <div class="media-body" v-show="isVisible">
            <div class="comment">
                <h6 class="mt-0 beta-title row comment-title">
                    <span class="col">{{ commentThread.user.username }}</span>
                    <span class="font14 col-md-3">{{ commentThread.comment.created_at | formatDate }}</span>
                </h6>
                <textarea v-if="isEditing && myComment" v-model="commentEdit"></textarea>
                <p v-else>{{ commentThread.comment.text }}</p>
                <div v-if="myComment && isEditing">
                    <button class="btn btn-light btn-sm" @click="stopEditing">Stop Editing</button>
                    <button class="btn btn-light btn-sm" @click="saveEdit">Save</button>
                </div>
                <div v-else-if="myComment">
                    <button class="btn btn-light btn-sm" @click="editComment">Edit</button>
                </div>
                <div v-else-if="loggedIn">
                    <button class="btn btn-light btn-sm" @click="toggleReplyBox">Reply</button>
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
                @editComment="emitEditComment"
                />
        </div>
    </div>
</template>

<script>
import commentApi from '../services/comment.js'
import auth from '../services/auth.js'

export default {
    name: 'CommentThread',
    props: {
        commentThread: Object
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
            this.$emit('newComment', {
                comment: this.commentThread.comment.comment_id,
                text: this.commentEdit
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
        },
        editComment() {
            this.commentEdit = this.commentThread.comment.text
            this.isEditing = true
        },
        stopEditing() {
            this.isEditing = false
        },
        saveEdit() {
            this.$emit('editComment', {
                commentId: this.commentThread.comment.comment_id,
                text: this.commentEdit
            })
            this.isEditing = false
        },
        emitEditComment({commentId, text}) {
            this.$emit('editComment', {commentId, text})
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
            return this.loggedIn &&
                this.commentThread.user.user_id == localStorage.getItem('bm_user_id')
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
