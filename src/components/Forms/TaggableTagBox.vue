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
        checkForErrors(tagText) {
            if (tagText.includes(",")) {  
                return 'Tags cannot contain commas.';
            } else if (!tagText) {
                return 'Tags must contain text.';
            } else if (tagText.length > 50) {
                return 'Tags must be less than 50 characters';
            }

            return false;
        },
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
        selected() {
            let selected = this.selected;

            let tags = [];
            let newTags = [];

            for (let index = 0; index < selected.length; index++) {
                const element = selected[index];
                
                if(typeof element === 'string' || element instanceof String) {
                    let tagText = element.trim();
                    let error = this.checkForErrors(tagText)

                    if (error) {
                        Event.$emit('tagsError', {error})
                        this.selected.splice( this.selected.indexOf(element), 1 )
                    } else {
                        newTags.push(tagText);
                    }  
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