<template>
    <div>
        <div class="comment" v-if="loggedIn">
            <div class="new-comment">
                <h6 class="mt-0 beta-title">Comment as <strong>{{ username }}</strong></h6>
                <CreateComment :storyId="story.story_id" />
            </div>
        </div>
        <br>
        <div v-for="commentThread in story.comments" :key="commentThread.comment.comment_id">
            <CommentThread :commentThread="commentThread" :myStory="myStory" :karmaUsers="karmaUsers"/>
            <br />
        </div>
        <DeleteCommentModal />
    </div>
</template>

<script>
import CreateComment from './CreateComment'
import CommentThread from './CommentThread'
import DeleteCommentModal from './Modals/DeleteCommentModal'
import auth from '../services/auth.js'

export default {
    name: 'Comments',
    components: {
        CreateComment,
        CommentThread,
        DeleteCommentModal
    },
    props: {
        story: Object
    },
    data() {
        return {
            newComment: ''
        }
    },
    computed: {
        username() {
            return auth.username();
        },
        loggedIn() {
            return auth.isLoggedIn()
        },
        karmaUsers() {
            if (!this.story.karma) {
                return null
            }

            return this.story.karma.map(karma => {
                return karma.to_user_id
            })
        },
        myStory() {
            return this.story.user.user_id == auth.userId()
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