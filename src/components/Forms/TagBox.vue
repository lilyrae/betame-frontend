<template>
    <v-select
        :id="id"
        v-model="selected"
        :options="options"
        label="text"
        multiple
        >
        <template slot="no-options">
            Search for Tags..
        </template>
    </v-select>
</template>

<script>
import tag from '../../services/tag.js'

export default {
    name: 'TagBox',
    props: {
        tagTypeId: null,
        id: null
    },
    data() {
        return {
            selected: null,
            options: []
        }
    },
    mounted() {
        this.getTagList();
    },
    methods: {
        getTagList() {
            tag.search(this.tagTypeId)
                .then(response => {
                    this.options = response.data;
                }).catch(errorResponse => {
                    let error = errorResponse || 'Failed to get tags'
                    Event.$emit('tagsError', {error});
                })
        }
    },
    watch: {
        selected() {
            let selected = this.selected;

            let tags = [];

            for (let index = 0; index < selected.length; index++) {
                const element = selected[index];
                tags.push(element.tag_id);
            }

            Event.$emit('updatedTags', {
                tags,
                newTags: [],
                tagTypeId: this.tagTypeId
            })
        }
    }
}
</script>