<template>
    <v-select
        :id="id"
        v-model="selected"
        :options="options"
        label="text"
        multiple
        >
        <template slot="no-options">
            Loading..
        </template>
    </v-select>
</template>

<script>
export default {
    name: 'TagBox',
    props: {
        storyId: String,
        tagTypeId: Number,
        id: String,
        tags: Array,
        options: Array
    },
    data() {
        return {
            selected: null,
            watchOnce: true
        }
    },
    watch: {
        tags() {
            if (this.watchOnce) {
                this.selected = this.tags.slice(0)
                this.watchOnce = false
            }
        },
        selected() {
            this.$store.dispatch('storytags/processSelectedStoryTags', {
                selectedTags: this.selected,
                oldTags: this.tags,
                storyId: this.storyId,
                tagTypeId: this.tagTypeId
            })
        }
    }
}
</script>