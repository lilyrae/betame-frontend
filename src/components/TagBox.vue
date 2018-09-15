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
        }, 350),
        replaceTag(string, object) {
            for (let index = 0; index < this.selected.length; index++) {
                const element = this.selected[index];

                if(element === string) {
                    this.selected[index] = object;
                }
            }
        }
    },
    watch: {
        selected() {
            let selected = this.selected;

            for (let index = 0; index < selected.length; index++) {
                const element = selected[index];
                
                if(typeof element === 'string' || element instanceof String) {
                    tag.create(this.tagTypeId, element)
                    .then(response => {
                        this.replaceTag(element, response.data)
                    });
                }
            }
        }
    }
}
</script>