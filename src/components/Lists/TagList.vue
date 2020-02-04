<template>
    <span>
        <button
            v-for="tag in tags"
            v-bind:key="tag.tag_id"
            v-bind:class="tagClass(tag.tag_type_id)"
            class="badge beta-badge small-margin hide-overflow"
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
        },
        tagClass(typeId) {
            return tag.tagClass(typeId);
        }
    }
}
</script>

<style scoped>
.beta-badge:hover {
    filter: brightness(75%);
}
</style>
