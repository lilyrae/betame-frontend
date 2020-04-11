<template>
    <Modal @closeModal="closeModal" :isVisible="showModal">
        <template slot="header">Delete {{ story.title }}</template>
        <div class="font18">
            <p>Are you sure you want to delete your story?</p>
            <p><strong><u>This cannot be undone.</u></strong> You will also be deleting all the comments along with it.</p>
            <p>You will not get back any cups of tea you used to publish this story.</p>
        </div>
        <template slot="footer">
            <button class="btn" :disabled="isLoading" @click="closeModal">Cancel</button>
            <button class="btn btn-dark ld-ext-right"
                :class="{'running': isLoading }"
                :disabled="isLoading"
                @click="deleteStory"
                >
                Delete
                <div class="ld ld-square ld-blur"></div>
            </button>
        </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue'
import story from '../../services/story.js'
import { EventBus } from '../../event-bus.js'

export default {
    name: 'DeleteStoryModal',
    components: {
        Modal
    },
    data() {
        return {
            showModal: false,
            isLoading: false,
            story: {}
        }
    },
    created() {
        EventBus.$on('showDeleteStoryModal', ({story}) => {
            this.story = story
            this.showModal = true
        })
    },
    methods: {
        deleteStory() { 
            this.error = null
            this.isLoading = true

            story.delete(this.story.story_id)
                .then(() => {
                    // TODO success alert
                    this.$store.cache.delete('account/fetchStories')
                    this.$emit('refresh')
                    this.isLoading = false
                    this.closeModal()
                }).catch(error => {
                    this.error = error || 'Failed to delete the story'
                    this.isLoading = false
                });
        },
        closeModal() {
            this.showModal = false
        }
    },
    beforeDestroy() {
        EventBus.$off('showDeleteStoryModal')
    }
}
</script>
