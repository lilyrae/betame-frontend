<template>
    <StoryItem :story="story" class="my-story-item" :class="{'private-bg' : isPrivate}">
        <div class="float-right">
            <span v-show="isPrivate" style="color: #c35400;">Private</span>
            <span v-show="!isPrivate" class="text-info">Public</span>
            <toggle-button :value="isPrivate"
                color="#ffc107"
                class="toggle"
                :sync="true"
                @change="updateIsPrivate"
                :labels="{checked: '🔒', unchecked: '🔓'}"/>
            <button class="btn btn-outline-info small-margin btn-sm" @click="redirectToEditPage">Edit</button>
            <button class="btn btn-dark btn-sm" @click="showDeleteModal">Delete</button>
        </div>
    </StoryItem>
</template>

<script>
import StoryItem from '../../components/Lists/StoryItem.vue'
import { EventBus } from '../../event-bus.js'

export default {
    name: 'MyStoryItem',
    components: {
        StoryItem
    },
    props: {
        story: {}
    },
    data() {
        return {
            isPrivate: true
        }
    },
    created() {
        this.isPrivate = this.story.is_private
        EventBus.$on('revertPrivacy', (story) => {
            if (story.story_id === this.story.story_id) {
                this.isPrivate = !this.isPrivate
            }
        })
    },
    methods: {
        updateIsPrivate ({value}) {
            this.isPrivate = value
            EventBus.$emit('showStoryPrivacyModal', {story: this.story})
        },
        showDeleteModal() {
            this.$store.commit('api/success', null)
            EventBus.$emit('showDeleteStoryModal', {story: this.story})
        },
        redirectToEditPage() {
            this.$store.commit('api/success', null)
            this.$store.commit('story/story', this.story)
            this.$router.push(`/story/edit/${this.story.story_id}`)
        }
    },
    beforeDestroy() {
        EventBus.$off('revertPrivacy')
    }
}
</script>

<style>
.my-story-item .stats {
    text-align: left;
}
.toggle {
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 15px;
}

.private-bg {
    background-color: #eaebec !important;
}

.v-switch-button {
    z-index: 1 !important;
}
</style>