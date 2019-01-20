<template>
    <div class="media mt-3">
        <div class="media-body">
            <div class="comment">
                <h6 class="mt-0 beta-title">{{ commentThread.user.username }}</h6>
                <p>{{ commentThread.comment.text }}</p>
                <button class="btn btn-light btn-sm" @click="toggleReplyBox">Reply</button>
                <div class="new-comment" v-show="showReplyBox">
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
export default {
    name: 'CommentThread',
    props: {
        commentThread: Object
    },
    data() {
        return {
            showReplyBox: false,
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
        }
    }
}
</script>
