<template>
    <div>
        <ErrorAlert :error="error"/>
        <form class="text-left" v-on:submit.prevent="addTags">
            <div class="form-group row">
                <label for="language" class="col-sm-2 col-form-label">Language</label>
                <div class="col-sm-9">
                <v-select 
                    id="language-select"
                    v-model="language"
                    :options="languageOptions"
                    label="text"
                    >
                    <template slot="no-options">
                        Loading languages..
                    </template>
                </v-select>
                </div>
            </div>
            <div class="form-group row">
                <label for="topics" class="col-sm-2 col-form-label">Fandom / Topic</label>
                <div class="col-sm-9">
                <TagBox id="topic-select" :tagTypeId="topicId"></TagBox>
                </div>
            </div>
            <div class="form-group row">
                <label for="tags" class="col-sm-2 col-form-label">Tags</label>
                <div class="col-sm-9">
                <TagBox id="tag-select" :tagTypeId="customId"></TagBox>
                </div>
            </div>
            <br>
            <button type="submit" class="btn btn-lg btn-info">Add</button>&nbsp;
            <button type="button" @click="skipAddingTags" class="btn btn-lg btn-info">Skip</button>
        </form>
    </div>
</template>

<script>
import ErrorAlert from '../components/ErrorAlert.vue'
import TagBox from './TagBox.vue'
import tag from '../services/tag.js'

export default {
    name: 'StoryTagForm',
    components: {
        TagBox,
        ErrorAlert
    },
    data() {
        return {
            customId: null,
            topicId: null,
            language: null,
            languageOptions: [],
            tags: [],
            newTags: [],
            error: null
        }
    },
    props: {
        storyId: null
    },
    methods: {
        addTags() {
            if(this.noTagsSelected()) {
                this.error = {
                    message: 'No tags have been selected.'
                };
                return;
            }

            let tags = [];
            tags = tags.concat(this.tags[this.topicId])
            tags = tags.concat(this.tags[this.customId]);

            if(this.language != null) {
                tags.push(this.language.tag_id)
            }

            tag.addToStory(this.storyId, tags, this.newTags[this.topicId], this.newTags[this.customId])
                .then(response => {
                    Event.$emit('addedTagsToStory');
                }).catch(error => {
                    this.error = error;
                })
        },
        noTagsSelected() {
            return this.tags[this.topicId].length == 0
                && this.tags[this.customId].length == 0
                && this.language == null
                && this.newTags[this.topicId].length == 0
                && this.newTags[this.topicId].length == 0
        },
        skipAddingTags () {
            Event.$emit('addedTagsToStory');
        }
    },
    mounted() {
        this.topicId = tag.topicTagTypeId();
        this.customId = tag.customTagTypeId();

        // initialise new tags to empty array
        this.newTags[this.topicId] = []
        this.newTags[this.customId] = []
        this.tags[this.topicId] = []
        this.tags[this.customId] = []

        Event.$on('updatedTags', ({tags, newTags, tagTypeId}) => {
            this.tags[tagTypeId] = tags;
            this.newTags[tagTypeId] = newTags;
        });

        tag.search(tag.languageTagTypeId())
            .then(response => {
                this.languageOptions = response.data;
            }).catch(error => {
                this.error = error;
            })
    }
}
</script>