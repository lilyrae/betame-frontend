<template>
    <li class="list-group-item beta-text">
        <div class="row">
        <div class="bullet-point-col">
            <i class="fas fa-pen-nib text-danger font14"></i>
        </div>
        <div class="content-col">
            <h4>
            <a :href="storyUrl" class="beta-title" target="_blank">{{ story.title }}</a>&nbsp;
            <span class="font18 grey">by {{ story.user.username }}</span>
            <span class="beta-title font14 float-right">{{ story.created_at | formatDate }}</span>
            </h4>
            <div class="font18">
                <p>{{ story.notes }}</p>
                <p class="small-bottom-margin">
                    <span
                    v-for="tag in story.tags"
                    v-bind:key="tag.tag_id"
                    v-bind:class="{
                        'beta-grey-badge': tag.tag_type_id == 1,
                        'beta-blue-badge': tag.tag_type_id == 2,
                        'beta-dark-blue-badge': tag.tag_type_id == 3,
                        'badge-info': tag.tag_type_id == 4
                    }"
                    class="badge small-margin">
                        {{ tag.text }}
                    </span>
                </p>
                <p class="small-bottom-margin"><i>{{ story.word_count }} words</i></p>
            </div>
            <slot></slot>
        </div>
        </div>
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
    },
    computed: {
        storyUrl() {
            return "/#/story/" + this.story.story_id;
        }
    }
}
</script>

<style scoped>
.bullet-point-col {
    width: 3%;
    padding: 7px;
}

.content-col {
    width: 95%;
    padding: 5px;
}

.small-bottom-margin {
    margin-bottom: 8px;
}
</style>