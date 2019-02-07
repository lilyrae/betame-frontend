<template>
    <div class="jumbotron beta-jumbotron">
        <h3 class="beta-title hide-overflow"><slot name="title"></slot></h3>
        <slot name="subtitle"></slot>
        <div class="font18">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Jumbotron'
}
</script>
