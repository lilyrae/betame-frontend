<template>
    <div>
        <div class="comment" v-if="loggedIn">
            <div class="new-comment">
                <h6 class="mt-0 beta-title">Comment as <strong>{{ username }}</strong></h6>
                <form v-on:submit.prevent="createComment(newComment, '')">
                    <textarea v-model="newComment" required maxlength="10000"></textarea>
                    <button class="btn btn-light float-right">Post</button>
                </form>
            </div>
        </div>
        <hr>
        <div v-for="commentThread in comments" :key="commentThread.id">
            <CommentThread :commentThread="commentThread"/>
            <br />
        </div>
    </div>
</template>

<script>
import CommentThread from './CommentThread'
import commentApi from '../services/comment.js'
import auth from '../services/auth.js'
import { EventBus } from '../event-bus.js';

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
    created() {
        EventBus.$on('newComment', ({text, parentId}) => {
            this.createComment(text, parentId)
        })

        EventBus.$on('editComment', ({commentId, text}) => {
            this.editComment(commentId, text)
        })
    },
    methods: {
        createComment(text, parentId) {
            this.$emit('startLoading')

            commentApi.create(this.storyId, parentId, text)
                .then(() => {
                    this.newComment = ''
                    this.$emit('refresh')
                    // TODO -> display success
                }).catch((error) => {
                    this.$emit('commentsError', error)
                })
        },
        editComment(commentId, text) {
            this.$emit('startLoading')

            commentApi.edit(commentId, text)
                .then(() => {
                    this.$emit('refresh')
                }).catch((error) => {
                    this.$emit('commentsError', error)
                })
        }
    }
}
</script>

<style>
.media {
    padding-left: 15px;
    font-size: 15px;
    background-color: #4996a29e;
    border-radius: 5px;
}

.comment {
    background-color: #ffffff7d;
    border-radius: 5px;
    padding: 10px;
}

.comment button {
    margin: 5px;
}

.new-comment {
    margin: 10px;
    margin-bottom: 45px;
}

.comment textarea{
    width: 100%;
    border-radius: 5px;
    padding: 10px;
}

.dashed-line {
    border-top: 1px dotted #c5a8a8;
    margin-bottom: 35px;
    margin-top: 10px;
}
</style>