<template>
  <Jumbotron>
    <span slot="title">404 Not Found</span>
    <div>
        <p>
            Sorry but it seems that what you are looking for doesn't exist!
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
  name: 'NotFound',
  components: {
      Jumbotron
  }
}
</script>