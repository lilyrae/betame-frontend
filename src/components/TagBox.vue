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
    }
}
</script>