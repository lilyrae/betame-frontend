<template>
  <Jumbotron>
    <span slot="title">404 Not Found</span>
    <div>
        <p>
            Sorry but it seems that what you are looking for doesn't exist!
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
  name: 'NotFound',
  components: {
      Jumbotron
  }
}
</script>