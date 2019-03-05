<template>
    <span>
        <button
            v-for="tag in tags"
            v-bind:key="tag.tag_id"
            v-bind:class="{
                'beta-grey-badge': tag.tag_type_id == languageId,
                'beta-blue-badge': tag.tag_type_id == topicId,
                'badge-info': tag.tag_type_id == customId,
                'beta-dark-blue-badge': tag.tag_type_id == helpId
            }"
            class="btn badge beta-badge small-margin hide-overflow"
            @click="clickedTag(tag)">
                {{ tag.text }}
                <span v-if="deletable" class="font-weight-light">&nbsp;x</span>
        </button>
    </span>
</template>

<script>
import tag from '../../services/tag.js'

export default {
    name: 'TagList',
    props: {
        tags: Array,
        deletable: Boolean
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
    },
    methods: {
        clickedTag(tag) {
            this.$emit('clickedTag', {tag})
        }
    }
}
</script>

<style scoped>
.beta-badge:hover {
    filter: brightness(75%);
}
</style>
