<template>
  <Jumbotron class="text-left">
    <div slot="title">
        <span v-if="isLoadingPage">
            <center>..Loading..</center>
        </span>
        <span v-else>
            <span class="hide-overflow">{{ story.title }}</span>
            <span class="font18 beta-text"> by {{ story.user.username }}</span>
            <span class="font14 float-right">{{ story.created_at | formatDate }}</span>
        </span>
    </div>
    <div slot="subtitle">
        <span v-if="!isLoadingPage">
            <h5 class="hide-overflow"><a @click="recordClick" class="text-info beta-link" :href="story.url" target="_blank">{{ story.url }}</a></h5>
        </span>
        <hr>
    </div>
    <div>
        <div v-if="isLoadingPage">
            <center><div class="lds-circle"><div></div></div></center>
        </div>
        <div v-else>
            <p class="hide-overflow">{{ story.notes }}</p>
            <p>
                <TagList :tags="story.tags"/>
            </p>
            <p><i>{{ story.word_count }} words</i></p>
        </div>
    </div>
    <br>
    <Comments :comments="comments"/>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../templates/Jumbotron.vue'
import TagList from '../components/TagList.vue'
import Comments from '../components/Comments.vue'
import story from '../services/story.js'
import { format } from 'date-fns'

export default {
    name: 'Story',
    components: {
        Jumbotron,
        TagList,
        Comments
    },
    props: {
        id: null
    },
    data() {
        return {
            story: {
                user: {}
            },
            comments: [
                {
                    user: 'Nesh',
                    message: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
                    replies: [
                        {
                            user: 'lilblister',
                            message: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
                            replies: [
                                {
                                    user: 'Nesh',
                                    message: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
                                    replies: [
                                        
                                    ]
                                }
                                
                            ]
                        },
                        {
                            user: 'Lily',
                            message: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
                            replies: [
                                
                            ]
                        }
                    ]
                },
                {
                    user: 'Lily',
                    message: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
                    replies: [
                        
                    ]
                },
                {
                    user: 'lilblister',
                    message: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
                    replies: [
                        {
                            user: 'Nesh',
                            message: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
                            replies: [
                                
                            ]
                        }
                    ]
                }
            ],
            isLoadingPage: false
        };
    },
    created() {
        this.isLoadingPage = true;
        story.byId(this.id)
            .then((response) => {
                this.story = response.data;
                document.title = this.story.title + ' - Beta me.';
            }).catch(() => {
                this.$router.push('/404')
            }).finally(() => {
                this.isLoadingPage = false;
            });
    },
    methods: {
        recordClick() {
            this.$matomo.trackPageView(this.story.url)
        }
    },
    filters: {
        formatDate(date) {
            return format(date, 'Do MMMM YYYY');
        }
    }
}
</script>
