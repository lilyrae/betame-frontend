<template>
    <div class="media mt-3">
        <div class="media-body">
            <div class="comment">
                <h6 class="mt-0 beta-title">{{ commentThread.user }}</h6>
                {{ commentThread.message }}
            </div>
            <CommentThread v-for="replyComment in commentThread.replies" :key="replyComment.id" :commentThread="replyComment"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentThread',
    props: {
        commentThread: Object
    }
}
</script>
