<template>
    <StoryItem :story="story" class="my-story-item" :class="{'private-bg' : isPrivate}">
        <div class="float-right">
            <span v-show="isPrivate" style="color: #c35400;">Private</span>
            <span v-show="!isPrivate" class="text-info">Public</span>
            <toggle-button :value="story.is_private"
                color="#ffc107"
                class="toggle"
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
        console.log(this.isPrivate)
    },
    methods: {
        updateIsPrivate ({value, _event}) {
            console.log(value)
            this.isPrivate = value
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
    watch: {
        isPrivate(val) {
            console.log('changing private')
        }
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
    background-color: #cfd2d6 !important;
}
</style>