<template>
  <Jumbotron>
    <span slot="title">Login</span>
    <div class="offset-sm-2 col-sm-8">
        <form class="beta-text">
            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-9">
                <input type="email" class="form-control">
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-9">
                <input type="password" class="form-control"/>
                </div>
            </div>
        </form>
        <br>
        <button class="btn btn-lg btn-info" type="button">Login</button>
    </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../templates/Jumbotron.vue'

export default {
  name: 'Login',
  components: {
      Jumbotron
  }
}
</script>