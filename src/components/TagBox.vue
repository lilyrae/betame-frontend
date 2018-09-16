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
import tag from '../services/tag.js'
import _ from 'lodash'

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
    methods: {
        onSearch(query, loading) {
            loading(true);
            this.search(loading, query, this);
        },
        search: _.debounce((loading, query, self) => {
            tag.searchWithText(query, self.tagTypeId)
            .then(response => {
                self.options = response.data;
                loading(false);
            });
        }, 350)
    },
    watch: {
        selected() {
            let selected = this.selected;

            let tags = [];
            let newTags = [];

            for (let index = 0; index < selected.length; index++) {
                const element = selected[index];
                
                if(typeof element === 'string' || element instanceof String) {
                    newTags.push(element);
                } else {
                    tags.push(element.tag_id);
                }
            }

            Event.$emit('updatedTags', {
                tags,
                newTags,
                tagTypeId: this.tagTypeId
            })
        }
    }
}
</script>