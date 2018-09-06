<template>
    <li class="list-group-item beta-text">
        <h4>
        <a :href="story.url" target="_blank">{{ story.title }} </a>
        <span class="font18 grey">by {{ story.user.username }}</span>
        <span class="beta-title font14 float-right">18th Dec 2018</span>
        </h4>
        <p>{{ story.intent }}</p>
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
        <p><i>1000 words</i></p>
        <slot></slot>
    </li>
</template>

<script>
import story from '../services/story.js'

export default {
    name: 'StoryItem',
    props: {
        story: {}
    }
}
</script>