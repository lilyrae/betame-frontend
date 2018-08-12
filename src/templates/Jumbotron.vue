<template>
    <Default>
        <div class="jumbotron beta-jumbotron">
            <h3 class="beta-title"><slot name="title"></slot></h3>
            <br>
            <slot></slot>
        </div>
    </Default>
</template>

<script>
import Default from './Default.vue'

export default {
    name: 'Jumbotron',
    components: {
        Default
    }
}
</script>