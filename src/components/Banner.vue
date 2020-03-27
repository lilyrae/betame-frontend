<template>
    <div class="banner jumbotron text-left" :class="styling">
        <h2>{{ title }} <span><font-awesome-icon icon="heart" /></span></h2>
        <h5>{{ firstMessage }}</h5>
        <h5>{{ secondMessage }}</h5>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Banner',
    props: {
        title: {
            type: String,
            default: 'Beta me, Beta you'
        },
        firstMessage: {
            type: String,
            default: 'BetaMe is a place for sharing your writing & giving and receiving feedback.'
        },
        secondMessage: {
            type: String,
            default: 'The community welcomes all writers, from fan fiction to blog writing!'
        },
        styling: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<!-- box-shadow: 0 0 0 3px #fff, 0 0 0 5px #de515e5c, 0 0 0 10px #fff, 0 0 2px 10px #de515e; -->
<style scoped>

.grey-banner {
    background-color: #f3f4f5 !important;
    height: calc(100vh - 150px);
}

.spaced-out h5 {
    margin-top: 40px;
    margin-bottom: 20px;
}

.banner {
    background-color: #bfdde2;
    font-family: 'Just Another Hand', cursive;
    padding: 1.2rem 1rem;
    letter-spacing: 1px;
    background-image: url('~@/assets/big-scroll.png');
    background-position: right bottom;
    background-repeat: no-repeat; 
    margin-bottom: 10px;
    min-height: 180px;
}

.banner h2 {
    font-size: 400%;
    padding-left: 30px;
    letter-spacing: 2px;
}

.banner h2 span {
    font-size: 10%;
}

.banner h5 {
    font-family: 'PT Sans', sans-serif;
    font-weight: 100;
    padding-left: 30px;
}

.banner div {
    padding: 10px 0;
}

@media (max-width: 768px) {
    .banner h2 {
        padding-left: 0px;
        font-size: 3rem;
    }
}

@media (max-width: 991px) {
    .banner {
        background-image: none;
    }
}
</style>
