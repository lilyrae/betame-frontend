<template>
    <div>
        <ErrorAlert :error="error" :errorMessage="errorMessage"/>
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
                <label for="tags" class="col-sm-2 col-form-label">Help Tags</label>
                <div class="col-sm-9">
                <TagBox id="tag-select" :tagTypeId="helpId"></TagBox>
                </div>
            </div>
            <div class="form-group row">
                <label for="tags" class="col-sm-2 col-form-label">Tags</label>
                <div class="col-sm-9">
                <TaggableTagBox id="tag-select" :tagTypeId="customId"></TaggableTagBox>
                </div>
            </div>
            <br>
            <center>
                <button type="submit" class="btn btn-lg betame-dark-button">Add</button>&nbsp;
                <button type="button" @click="skipAddingTags" class="btn btn-lg betame-dark-button">Skip</button>
            </center>
        </form>
    </div>
</template>

<script>
import ErrorAlert from '../components/ErrorAlert.vue'
import TagBox from './TagBox.vue'
import TaggableTagBox from './TaggableTagBox.vue'
import tag from '../services/tag.js'

export default {
    name: 'StoryTagForm',
    components: {
        TagBox,
        TaggableTagBox,
        ErrorAlert
    },
    data() {
        return {
            customId: null,
            topicId: null,
            helpId: null,
            language: null,
            languageOptions: [],
            tags: [],
            newTags: [],
            error: null,
            errorMessage: ''
        }
    },
    props: {
        storyId: null
    },
    methods: {
        addTags() {
            if(this.noTagsSelected()) {
                this.errorMessage = 'No tags have been selected.';
                return;
            }

            let tags = [];

            if(this.language != null) {
                tags.push(this.language.tag_id)
            }

            tags = tags.concat(this.tags[this.topicId])
            tags = tags.concat(this.tags[this.helpId]);
            tags = tags.concat(this.tags[this.customId]);

            tag.addToStory(this.storyId, tags, this.newTags[this.customId])
                .then(() => {
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
    created() {
        this.topicId = tag.topicTagTypeId();
        this.customId = tag.customTagTypeId();
        this.helpId = tag.helpTagTypeId();

        // initialise new tags to empty array
        this.newTags[this.customId] = []
        this.tags[this.topicId] = []
        this.tags[this.customId] = []
        this.tags[this.helpId] = []

        Event.$on('updatedTags', ({tags, newTags, tagTypeId}) => {
            this.tags[tagTypeId] = tags;
            this.newTags[tagTypeId] = newTags;
        });

        Event.$on('tagsError', ({error}) => {
            this.error = error;
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