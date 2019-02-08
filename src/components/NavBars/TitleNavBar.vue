<template>
    <div class="navbar navbar-light bg-light beta-innerbar title-bar">
        <h3 class="text-left muted-title">
            {{ title }}
        </h3>
    </div>
</template>

<script>
export default {
    name: 'TitleNavBar',
    props: {
        title: String
    }
}
</script>

<style scoped>
.title-bar {
    padding: 20px;
}

.muted-title {
    color: rgb(202, 202, 202);
    -webkit-text-stroke: 1px #a7a4a4;
    padding-left: 25px;
    margin-bottom: 30px;
}
</style>

