<template>
    <Modal :isVisible="showModal">
        <template slot="header">
            <font-awesome-icon v-if="story.is_private" icon="lock-open" />
            <font-awesome-icon v-else icon="lock" />
            &nbsp;{{ story.title }}
        </template>
        <p class="font18">
            Are you sure you want to make your story <span v-if="story.is_private" class="font-weight-bold">public</span><span class="font-weight-bold" v-else>private</span>?
            <span v-if="story.is_private">Everyone</span><span v-else>No one</span> will be able to see {{ story.title }}.
        </p>
        <template slot="footer">
            <button class="btn" :disabled="isLoading" @click="cancel">Cancel</button>
            <button class="btn btn-info ld-ext-right"
                :class="{'running': isLoading }"
                :disabled="isLoading"
                @click="togglePrivacy"
                >
                Confirm
                <div class="ld ld-square ld-blur"></div>
            </button>
        </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue'
import { EventBus } from '../../event-bus.js'

export default {
    name: 'StoryPrivacyModal',
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
        EventBus.$on('showStoryPrivacyModal', ({story}) => {
            this.story = story
            this.showModal = true
        })

        EventBus.$on('closeModal', () => {
            this.cancel()
        })
    },
    methods: {
        async togglePrivacy() {
            this.isLoading = true
            await this.$store.dispatch('account/togglePrivacy', this.story)
            this.isLoading = false
            this.showModal = false
        },
        cancel() {
            EventBus.$emit('revertPrivacy', this.story)
            this.showModal = false
        }
    }
}
</script>
