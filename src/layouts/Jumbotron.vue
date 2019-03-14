<template>
    <Default>
        <JumbotronComponent>
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