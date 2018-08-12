<template>
  <Jumbotron>
    <span slot="title">Thank you for submitting your story<br>to <strong>Beta me</strong>!</span>
    <div class="col-sm-8 offset-sm-2">
        <p>I would love to hear your feedback on how to improve this site. Please feel free to send me a message on how it could be better.</p>
        <textarea class="beta-textarea"></textarea>
        <br><br>
        <button class="btn btn-lg btn-info" type="button">Send</button>
        </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../templates/Jumbotron.vue'

export default {
  name: 'CreatedStory',
  components: {
      Jumbotron
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.beta-textarea {
  width: 100%;
  height: 100px;
}
</style>
