<template>
    <span>
        <span
        v-for="tag in tags"
        v-bind:key="tag.tag_id"
        v-bind:class="{
            'beta-grey-badge': tag.tag_type_id == languageId,
            'beta-blue-badge': tag.tag_type_id == topicId,
            'badge-info': tag.tag_type_id == customId,
            'beta-dark-blue-badge': tag.tag_type_id == helpId
        }"
        class="badge small-margin hide-overflow">
            {{ tag.text }}
        </span>
    </span>
</template>

<script>
import tag from '../services/tag.js'

export default {
    name: 'TagList',
    props: {
        tags: Array
    },
    computed: {
        topicId() {
            return tag.topicTagTypeId();
        },
        customId() {
            return tag.customTagTypeId();
        },
        helpId() {
            return tag.helpTagTypeId();
        },
        languageId() {
            return tag.languageTagTypeId();
        }
    }
}
</script>
