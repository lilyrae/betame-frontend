<template>
    <li class="list-group-item beta-text">
        <div class="row">
        <div class="bullet-point-col">
            <font-awesome-icon icon="pen-nib" class="betame-red font14"/>
        </div>
        <div class="content-col">
            <h4 class="hide-overflow row story-title">
                <span class="col">
                    <router-link class="beta-title beta-link" :to="storyUrl">{{ story.title }}</router-link>
                    &nbsp;<span class="font18 grey">by {{ story.user.username }}</span>
                </span>
                <span class="beta-title font14 col-md-3">{{ story.created_at | formatDate }}</span>
            </h4>
            <div class="font18">
                <p class="hide-overflow">{{ story.notes }}</p>
                <p class="small-bottom-margin">
                    <TagList :tags="story.tags"/>
                </p>
                <p class="small-bottom-margin row stats">
                    <span class="col"></span>
                    <span class="col-md-3">{{ story.word_count }} words,&nbsp;{{ story.comment_count }} {{ 'comment' | pluralise(story.comment_count) }}</span>
                    <span class="col"></span>
                </p>
            </div>
            <slot></slot>
        </div>
        </div>
    </li>
</template>

<script>
import TagList from './TagList.vue'

export default {
    name: 'StoryItem',
    components: {
        TagList
    },
    props: {
        story: {}
    },
    computed: {
        storyUrl() {
            return "/story/" + this.story.story_id;
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

.story-title span {
    margin: 3px;
}

@media only screen and (max-width: 1000px) {
    .bullet-point-col {
        width: 10%;
    }

    .content-col {
        width: 90%;
    }
}

.small-bottom-margin {
    margin-bottom: 8px;
}

.stats {
    font-size: 18px;
}
</style>