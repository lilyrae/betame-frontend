<template>
    <div>
        <p v-for="line in text.split('\n')" :key="line">{{line}}</p>
    </div>
</template>

<script>
export default {
    name: 'LineBreakText',
    props: {
        text: String
    }
}
</script>
