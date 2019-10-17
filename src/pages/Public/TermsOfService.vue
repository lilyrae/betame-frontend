<template>
    <Blog>
        <Banner title="Terms of Service" firstMessage="Welcome to BetaMe!"  secondMessage="Please read through our terms of service before joining our community." />
        <br>
        <div class="row">
            <div class="col-2">
                Menu
            </div>
            <div class="col-10">
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
        </div>
    </Blog>
</template>

<script>
import Blog from '../../layouts/Blog.vue'
import Banner from '../../components/Banner'

export default {
    name: 'TermsOfService',
    components: {
        Blog,
        Banner
    }
}
</script>

<style scoped>
.terms-title {
    margin-top: 30px;
}
</style>