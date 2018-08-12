<template>
  <Default>
    <SearchNavBar/>
    <!-- List of Stories -->
    <ul class="list-group list-group-flush">
      <li class="list-group-item beta-text" v-for="story in stories" v-bind:key="story.id">
        <h4>{{ story.title }} <span class="font18 grey">by {{ story.author }}</span></h4>
        
        <p>{{ story.intent }}</p>
        <span 
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
          </span>
      </li>
    </ul>
    <BottomNavBar />
  </Default>
</template>

<script>
import Default from '../templates/Default.vue'
import SearchNavBar from '../components/SearchNavBar.vue'
import BottomNavBar from '../components/BottomNavBar.vue'

export default {
  name: 'StoryList',
  components: {
      Default,
      SearchNavBar,
      BottomNavBar
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
          tags: [
            {
              id: 1,
              label: 'English',
              type: 1
            },
            {
              id: 2,
              label: 'Haikyuu!!',
              type: 2
            },
            {
              id: 3,
              label: 'first time',
              type: 3
            },
            {
              id: 4,
              label: 'creative',
              type: 4
            }
          ]
        },
        {
          id: 2,
          title: 'Fighting the odds',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Suet',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: [
            {
              id: 1,
              label: 'English',
              type: 1
            },
            {
              id: 3,
              label: 'Biology',
              type: 2
            },
            {
              id: 3,
              label: 'rip it to shreds',
              type: 3
            },
          ]
        },
        {
          id: 3,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Nemo',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: [
            {
              id: 1,
              label: 'English',
              type: 1
            },
            {
              id: 2,
              label: 'first time',
              type: 3
            },
            {
              id: 3,
              label: 'creative',
              type: 4
            }
          ]
        },
        {
          id: 4,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Alice in Wonderland',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: [
            {
              id: 1,
              label: 'English',
              type: 1
            },
            {
              id: 2,
              label: 'Haikyuu!!',
              type: 2
            },
            {
              id: 3,
              label: 'creative',
              type: 4
            },
            {
              id: 4,
              label: 'luvin lyfffe',
              type: 4
            },
            {
              id: 5,
              label: 'This is what you get',
              type: 4
            },
            {
              id: 6,
              label: 'Loads of tags',
              type: 4
            },
            {
              id: 7,
              label: 'I am what I am',
              type: 4
            },
          ]
        },
        {
          id: 5,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: [
            {
              id: 1,
              label: 'English',
              type: 1
            },
            {
              id: 2,
              label: 'Haikyuu!!',
              type: 2
            },
            {
              id: 3,
              label: 'creative',
              type: 4
            },
            {
              id: 4,
              label: 'luvin lyfffe',
              type: 4
            },
            {
              id: 5,
              label: 'This is what you get',
              type: 4
            },
            {
              id: 6,
              label: 'Loads of tags',
              type: 4
            },
            {
              id: 7,
              label: 'I am what I am',
              type: 4
            },
          ]
        },
        {
          id: 5,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: [
            {
              id: 1,
              label: 'English',
              type: 1
            },
            {
              id: 2,
              label: 'Haikyuu!!',
              type: 2
            },
            {
              id: 3,
              label: 'not super creative',
              type: 4
            },
            {
              id: 4,
              label: 'feelin alive',
              type: 4
            },
            {
              id: 5,
              label: 'a Brave New World',
              type: 4
            },
            {
              id: 6,
              label: 'This is a load of tags',
              type: 4
            },
          ]
        },
        {
          id: 5,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: [
            {
              id: 1,
              label: 'English',
              type: 1
            },
            {
              id: 2,
              label: 'Haikyuu!!',
              type: 2
            },
            {
              id: 3,
              label: 'creative',
              type: 4
            },
            {
              id: 4,
              label: 'luvin lyfffe',
              type: 4
            },
            {
              id: 5,
              label: 'This is what you get',
              type: 4
            },
            {
              id: 6,
              label: 'Loads of tags',
              type: 4
            },
            {
              id: 7,
              label: 'I am what I am',
              type: 4
            },
            {
              id: 8,
              label: 'Hello t o the hell yeah',
              type: 4
            },
            {
              id: 9,
              label: 'CAnnot stop meeeeeeeeeeeeeee',
              type: 4
            },
            {
              id: 10,
              label: 'I am what I am what I am what I am',
              type: 4
            },
          ]
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
