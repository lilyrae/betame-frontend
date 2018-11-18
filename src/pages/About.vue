<template>
  <Jumbotron>
    <span slot="title">About</span>
    <div>
        <p>
            Hello and welcome to Beta Me! This is a small project I started recently 
            with the aim of encouraging fellow writers to help each other improve their
            works. The idea came to me when I was having trouble writing a blog post and
            wanted to get some honest feedback. I hope it 
            can help other people (and me hehe :D).
            The site is a work in progress and there are many ideas for the future!
            If you have any thoughts or feedback, they would be much appreciated!
        </p>
        <p>
          <i class="fas fa-pen-nib text-danger font18"></i>
        </p>
    </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../templates/Jumbotron.vue'

export default {
  name: 'About',
  components: {
      Jumbotron
  }
}
</script>