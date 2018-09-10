<template>
    <form v-on:submit.prevent="addTags">
        <div class="form-group row">
            <label for="language" class="col-sm-2 col-form-label">Language</label>
            <div class="col-sm-9">
            <v-select 
                id="language-select"
                v-model="language"
                :options="languageOptions"
                label="text"
                >
            </v-select>
            </div>
        </div>
        <div class="form-group row">
            <label for="topics" class="col-sm-2 col-form-label">Topics</label>
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
        <button type="submit" class="btn btn-lg btn-info">Add</button>
    </form>
</template>

<script>
import TagBox from './TagBox.vue'
import tag from '../services/tag.js'

export default {
    name: 'StoryTagForm',
    components: {
        TagBox
    },
    data() {
        return {
            customId: null,
            topicId: null,
            language: null,
            languageOptions: []
        }
    },
    props: {
        storyId: null
    },
    methods: {
        addTags() {
            
        }
    },
    mounted() {
        this.topicId = tag.topicTagTypeId();
        this.customId = tag.customTagTypeId();

        tag.search(tag.languageTagTypeId())
            .then(response => {
                this.languageOptions = response.data;
            });
    }
}
</script>