<template>
    <Modal @closeModal="closeModal" :isVisible="showModal">
        <template slot="header">Delete Comment</template>
        <p class="font18">
            Are you sure you want to delete your comment?<br><strong><u>This cannot be undone.</u></strong> You will <strong><u>lose any cuppas</u></strong> gained from this comment.
        </p>
        <template slot="footer">
            <button class="btn" :disabled="isLoading" @click="closeModal">Cancel</button>
            <button class="btn btn-dark ld-ext-right"
                :class="{'running': isLoading }"
                :disabled="isLoading"
                @click="deleteComment"
                >
                Delete
                <div class="ld ld-square ld-blur"></div>
            </button>
        </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue'
import { EventBus } from '../../event-bus.js'

export default {
    name: 'DeleteCommentModal',
    components: {
        Modal
    },
    data() {
        return {
            showModal: false,
            isLoading: false,
            comment: null
        }
    },
    created() {
        EventBus.$on('showDeleteCommentModal', ({comment}) => {
            this.comment = comment
            this.showModal = true
        })
    },
    methods: {
        async deleteComment() { 
            this.isLoading = true
            await this.$store.dispatch('comments/deleteComment', this.comment.comment_id)
            if (this.isError) {
                this.isLoading = false
                this.closeModal()
                return
            }
            this.$store.dispatch('story/fetchStory', this.comment.story_id)
            this.isLoading = false
            this.closeModal()
        },
        closeModal() {
            this.showModal = false
        }
    },
    beforeDestroy() {
        EventBus.$off('showDeleteCommentModal')
    }
}
</script>
