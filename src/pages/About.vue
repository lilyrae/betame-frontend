<template>
  <Jumbotron>
    <span slot="title">About</span>
    <div>
        <p>
            Hello and welcome to Beta Me! This is a small project I started recently 
            with the aim of encouraging fellow writers to help each other improve their
            works. The idea came to me when I was having trouble writing a blog post and
            couldn't get any honest feedback out of my overly polite friends.
            The site is a work in progress so any ideas orfeedback would be much appreciated!
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