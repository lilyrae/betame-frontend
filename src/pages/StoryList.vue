<template>
  <div class="hello container">
    <TopNavBar/>
    <br>
    <SearchNavBar/>
    <!-- List of Stories -->
    <ul class="list-group list-group-flush">
      <li class="list-group-item beta-text" v-for="story in stories">
        <h4>{{ story.title }} <span class="font18 grey">by {{ story.author }}</span></h4>
        
        <p>{{ story.intent }}</p>
        <span v-for="tag in story.tags" class="badge beta-grey-badge small-margin">{{ tag }}</span>
        <span v-for="tag in story.tags" class="badge beta-blue-badge small-margin">{{ tag }}</span>
        <span v-for="tag in story.tags" class="badge beta-dark-blue-badge small-margin">{{ tag }}</span>
        <span v-for="tag in story.tags" class="badge badge-info small-margin">{{ tag }}</span>
      </li>
    </ul>    
  </div>
</template>

<script>
import TopNavBar from '../components/TopNavBar.vue'
import SearchNavBar from '../components/SearchNavBar.vue'

export default {
  name: 'StoryList',
  components: {
      TopNavBar,
      SearchNavBar
  },
  data() {
    return {
      stories: [],
    }
  },
  created: function () {
    this.getStories()
  },
  methods: {
    getStories() {
      this.stories = [
        {
          id: 1,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about life and death',
          tags: ['first time', 'creative']
        },
        {
          id: 2,
          title: 'Fighting the odds',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Suet',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['rip it to shreds', 'HP universe']
        },
        {
          id: 3,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Nemo',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['first time', 'creative']
        },
        {
          id: 4,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Alice in Wonderland',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['first time', 'creative']
        },
        {
          id: 5,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['first time', 'creative']
        },
        {
          id: 5,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['first time', 'creative']
        },
        {
          id: 5,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['first time', 'creative']
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
