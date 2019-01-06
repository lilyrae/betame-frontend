<template>
  <Jumbotron>
    <span slot="title">Sign up</span>
    <div class="offset-sm-2 col-sm-8">
        <p>
            Hello! This site is undergoing many changes and improvements at the moment and so we want to be in touch with our users.
            If you're are interested in getting an account, please send me a message!!
        </p>
        <p>
            You can request an account from me on our
            <a class="text-info" target="_blank" href="https://discord.gg/G42mrwz">Discord server</a>
            or you can fill in this
            <a class="text-info" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScrC9qDuyCJPiywDWCBw_jV8gmRYkvZ7fRXvMVfPV-vi6foPg/viewform?usp=sf_link">Google Form</a>
            and I'll get back to you as soon as possible!
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
    name: 'BetaSignup',
    components: {
        Jumbotron
    }
}
</script>