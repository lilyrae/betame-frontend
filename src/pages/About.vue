<template>
  <Jumbotron>
    <span slot="title">About</span>
    <div>
        <p>
            Hello and welcome to Beta Me! This is the place to come for giving and receiving 
            constructive criticism on your writing. Please feel free to post a snippet of your
            work, read over other works and suggest improvements.
            I hope that together we can help many people (including me hehe :D).
        </p>
        <p>
            The site is a work in progress and there are many ideas for the future!
            If you have any thoughts or feedback, they would be much appreciated!
            You can find me in the BetaMe Server on 
            <a class="text-info" target="_blank" href="https://discord.gg/G42mrwz">Discord</a>.
        </p>
        <p>
          <font-awesome-icon icon="pen-nib" class="betame-red font18"/>
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