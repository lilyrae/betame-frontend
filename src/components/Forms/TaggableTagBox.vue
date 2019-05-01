<template>
    <v-select
        :id="id"
        v-model="selected"
        :options="options"
        label="text"
        @search="onSearch"
        multiple
        taggable
        >
        <template slot="no-options">
            Search for Tags or create your own..
        </template>
    </v-select>
</template>

<script>
import tag from '../../services/tag.js'
import debounce from 'debounce'

export default {
    name: 'TaggableTagBox',
    props: {
        storyId: String,
        tagTypeId: Number,
        id: String,
        tags: Array
    },
    data() {
        return {
            selected: null,
            options: [],
            watchOnce: true
        }
    },
    methods: {
        onSearch(query, loading) {
            loading(true);
            this.search(loading, query, this);
        },
        search: debounce((loading, query, self) => {
            tag.searchWithText(query, self.tagTypeId)
            .then(response => {
                self.options = response.data;
                loading(false);
            });
        }, 350)
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