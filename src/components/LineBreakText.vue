<template>
    <div>
        <p v-for="(line, index) in text.split('\n')" :key="index">{{line}}</p>
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
