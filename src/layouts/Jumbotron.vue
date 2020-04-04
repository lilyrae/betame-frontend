<template>
    <Default>
        <JumbotronComponent class="jumbo-page">
            <span slot="title"><slot name="title"></slot></span>
            <span slot="subtitle"><slot name="subtitle"></slot></span>
            <slot></slot>
        </JumbotronComponent>
    </Default>
</template>

<script>
import Default from './Default.vue'
import JumbotronComponent from '../components/Jumbotron.vue'

export default {
    name: 'Jumbotron',
    components: {
        Default,
        JumbotronComponent
    }
}
</script>

<style scoped>
.jumbo-page {
    margin-bottom: 100px;
}
</style>