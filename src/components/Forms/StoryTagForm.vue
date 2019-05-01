<template>
    <div>
        <form class="text-left" v-on:submit.prevent="addTags">
            <div class="form-group row">
                <label for="languages" class="col-md-2 col-form-label">Language</label>
                <div :class="colSize">
                <TagBox id="language-select" :storyId="storyId" :tags="languageTags" :options="languageOptions" :tagTypeId="languageId"></TagBox>
                </div>
            </div>
            <div class="form-group row">
                <label for="topics" class="col-md-2 col-form-label">Fandom / Topic</label>
                <div :class="colSize">
                <TagBox id="topic-select" :storyId="storyId" :tags="topicTags" :options="topicOptions" :tagTypeId="topicId"></TagBox>
                </div>
            </div>
            <div class="form-group row">
                <label for="tags" class="col-md-2 col-form-label">Help Tags</label>
                <div :class="colSize">
                <TagBox id="tag-select" :storyId="storyId" :tags="helpTags" :options="helpOptions" :tagTypeId="helpId"></TagBox>
                </div>
            </div>
            <div class="form-group row">
                <label for="tags" class="col-md-2 col-form-label">Tags</label>
                <div :class="colSize">
                <TaggableTagBox id="tag-select" :storyId="storyId" :tags="customTags" :tagTypeId="customId"></TaggableTagBox>
                </div>
            </div>
            <br>
            <slot></slot>
        </form>
    </div>
</template>

<script>
import TagBox from './TagBox.vue'
import TaggableTagBox from './TaggableTagBox.vue'
import tag from '../../services/tag.js'
import { mapGetters } from 'vuex'

export default {
    name: 'StoryTagForm',
    components: {
        TagBox,
        TaggableTagBox
    },
    data() {
        return {
            topicId: tag.topicTagTypeId(),
            customId: tag.customTagTypeId(),
            helpId: tag.helpTagTypeId(),
            languageId: tag.languageTagTypeId(),
            watchOnce: true
        }
    },
    props: {
        storyId: String,
        colSize: {
            default: 'col-md-9'
        }
    },
    methods: {
        addTags() {
            // TODO: disable button until isLoading is done
            Event.$emit('addedTagsToStory');
        }
    },
    created() {
        this.$store.cache.dispatch('storytags/fetchTagOptions', {tagTypeId: this.languageId})
        this.$store.cache.dispatch('storytags/fetchTagOptions', {tagTypeId: this.topicId})
        this.$store.cache.dispatch('storytags/fetchTagOptions', {tagTypeId: this.helpId})
    },
    computed: {
        ...mapGetters('storytags', [
            'languageTags',
            'topicTags',
            'helpTags',
            'customTags',
            'languageOptions',
            'topicOptions',
            'helpOptions'
        ]),
    }
}
</script>