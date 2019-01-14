<template>
    <div>
        <div class="comment">
            <div class="new-comment">
            <h6 class="mt-0 beta-title">Comment as <strong>{{ username }}</strong></h6>
            <textarea></textarea>
            </div>
        </div>
        <hr>
        <div v-for="commentThread in comments" :key="commentThread.id">
            <CommentThread :commentThread="commentThread" />
            <br />
        </div>
    </div>
</template>

<script>
import CommentThread from './CommentThread'

export default {
    name: 'Comments',
    components: {
        CommentThread
    },
    props: {
        comments: Array
    },
    computed: {
        username() {
            return localStorage.getItem('bm_username');
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

.new-comment {
    margin: 10px;
}

.new-comment textarea{
    width: 100%;
}

.dashed-line {
    border-top: 1px dotted #c5a8a8;
    margin-bottom: 35px;
    margin-top: 10px;
}
</style>