<template>
    <div>
        <div class="comment-preview" v-if="showPreview" @click="showPreview = false">
            <vue-markdown >{{ newComment }}</vue-markdown>
        </div>
        <textarea v-else v-model="newComment" required maxlength="10000"></textarea>
        <button
            :disabled="isLoadingComments"
            v-if="isEditing || parentId"
            @click="cancel"
            class="btn btn-light float-right btn-sm"
            >Cancel
        </button>
        <button
            :disabled="isLoadingComments"
            @click="saveComment"
            class="btn btn-light float-right btn-sm ld-ext-right"
            :class="{'running': isLoadingComments }"
            >Save
            <div class="ld ld-square ld-blur"></div>
        </button>
        <button
            :disabled="isLoadingComments"
            v-if="newComment.length > 0"
            @click="showPreview = !showPreview"
            class="btn btn-light float-right btn-sm"
            >
            <span v-if="showPreview">Hide Preview</span>
            <span v-else>Show Preview</span>
        </button>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapGetters } from 'vuex'

export default {
    name: 'CreateComment',
    components: {
        VueMarkdown
    },
    props: {
        parentId: null,
        storyId: null,
        editComment: null
    },
    data() {
        return {
            showPreview: false,
            newComment: ''
        }
    },
    created () {
        this.setupEditing()
    },
    methods: {
        async saveComment() {
            if (this.isEditing) {
                if (this.editComment.text != this.newComment) {
                    await this.$store.dispatch('comments/editComment', {
                        commentId: this.editComment.comment_id,
                        text: this.newComment
                    })
                    if (this.isError) {
                        return
                    }
                    this.$router.push(`/story/${this.editComment.story_id}?comment_id=${this.editComment.comment_id}`)
                }
                this.$emit('doneEditing')
                return
            }

            // otherwise create comment
            const commentId = await this.$store.dispatch('comments/createComment', {
                text: this.newComment,
                parentId: this.parentId,
                storyId: this.storyId
            })
            if (this.isError || !commentId) {
                return
            }

            await this.$router.push(`/story/${this.storyId}?comment_id=${commentId}`)
            this.$store.dispatch('account/fetchUser')
            this.$emit('doneCreating')
        },
        cancel () {
            this.$emit('doneEditing')
            this.$emit('doneCreating')
        },
        setupEditing () {
            if (this.isEditing) {
                this.newComment = this.editComment.text
            }
        }
    },
    computed: {
        ...mapGetters('comments', ['isError', 'isLoadingComments']),
        isEditing() {
            return this.editComment != null
        }
    },
    watch: {
        editComment() {
            this.setupEditing()
        },
        isLoadingComments () {
            this.showPreview = this.isLoadingComments
        }
    }
}
</script>

<style>
.comment-preview {
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
    background-color: hsl(0, 0%, 100%, 0.7);
}
</style>