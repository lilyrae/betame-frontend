<template>
    <li class="list-group-item beta-text">
        <h4>
        <a :href="story.url" target="_blank">{{ story.title }} </a>
        <span class="font18 grey">by {{ story.user.username }}</span>
        <span class="beta-title font14 float-right">{{ story.created_at | formatDate }}</span>
        </h4>
        <p>{{ story.notes }}</p>
        <p 
        v-for="tag in story.tags"
        v-bind:key="tag.id"
        v-bind:class="{
            'beta-grey-badge': tag.type == 1,
            'beta-blue-badge': tag.type == 2,
            'beta-dark-blue-badge': tag.type == 3,
            'badge-info': tag.type == 4
        }"
        class="badge small-margin">
            {{ tag.label }}
        </p>
        <p><i>{{ story.word_count }} words</i></p>
        <slot></slot>
    </li>
</template>

<script>
import moment from 'moment'

export default {
    name: 'StoryItem',
    props: {
        story: {}
    },
    filters: {
        formatDate(date) {
            return moment(date).format('Do MMMM YYYY');
        }
    }
}
</script>