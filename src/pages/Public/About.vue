<template>
  <Jumbotron>
    <span slot="title">About</span>
    <div>
        <p>
            Hello and welcome to Beta Me! This is the place to come for giving and receiving 
            constructive criticism on your writing. Please feel free to post a snippet of your
            work, read over other works and suggest improvements.
            I hope that together we can help many people (including me hehe :D).
            The site is a work in progress so if you have any thoughts or feedback, they would be much appreciated!
        </p>
        <p>
            You can find me in the BetaMe Server on 
            <a class="text-info" target="_blank" href="https://discord.gg/G42mrwz">Discord</a>
            or follow me on Twitter 
            <a class="text-info" target="_blank" href="https://twitter.com/BetaMe6">@BetaMe6</a>.
        </p>
        <p>
          <font-awesome-icon icon="pen-nib" class="betame-red font18"/>
        </p>
    </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../../layouts/Jumbotron.vue'

export default {
  name: 'About',
  components: {
      Jumbotron
  }
}
</script>