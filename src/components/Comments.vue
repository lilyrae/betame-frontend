<template>
    <div>
        <div class="comment" v-if="loggedIn">
            <div class="new-comment">
                <h6 class="mt-0 beta-title">Comment as <strong>{{ username }}</strong></h6>
                <form v-on:submit.prevent="createComment(newComment, '')">
                    <textarea v-model="newComment" required></textarea>
                    <button class="btn btn-light float-right">Post</button>
                </form>
            </div>
        </div>
        <hr>
        <div v-for="commentThread in comments" :key="commentThread.id">
            <CommentThread :commentThread="commentThread" @newComment="newCommentEvent"/>
            <br />
        </div>
    </div>
</template>

<script>
import CommentThread from './CommentThread'
import commentApi from '../services/comment.js'
import auth from '../services/auth.js'

export default {
    name: 'Comments',
    components: {
        CommentThread
    },
    props: {
        comments: Array,
        storyId: String
    },
    data() {
        return {
            newComment: ''
        }
    },
    computed: {
        username() {
            return localStorage.getItem('bm_username');
        },
        loggedIn() {
            return auth.isLoggedIn()
        }
    },
    methods: {
        createComment(comment, parentId) {
            this.$emit('startLoading')

            commentApi.create(this.storyId, parentId, comment)
                .then(() => {
                    this.newComment = ''
                    this.$emit('refresh')
                    // TODO -> display success
                }).catch((error) => {
                    this.$emit('commentsError', error)
                })
        },
        newCommentEvent({comment, parentId}) {
            this.createComment(comment, parentId)
        },
        deleteComment(commentId) {
            commentApi.delete(commentId)
                .then(() => {
                    this.$emit('refresh')
                     // TODO -> display success
                }).catch((error) => {
                    this.$emit('commentsError', error)
                })
        }
    }
}
</script>

<style>
.media {
    border-left: 1px solid #c5a8a8;
    padding-left: 15px;
    font-size: 15px;
    background-color: #efecec;
}

.comment {
    background-color: #e2d7d7;
    border-radius: 5px;
    padding: 3px;
}

.comment button {
    margin: 5px;
}

.new-comment {
    margin: 10px;
    margin-bottom: 45px;
}

.new-comment textarea{
    width: 100%;
    border-radius: 5px;
}

.dashed-line {
    border-top: 1px dotted #c5a8a8;
    margin-bottom: 35px;
    margin-top: 10px;
}
</style>