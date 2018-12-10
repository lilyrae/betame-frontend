<template>
    <Default>
        <div class="jumbotron beta-jumbotron">
            <h3 class="beta-title hide-overflow"><slot name="title"></slot></h3>
            <slot name="subtitle"></slot>
            <div class="font18">
                <slot></slot>
            </div>
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