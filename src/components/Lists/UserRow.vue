<template>
    <li class="list-group-item">
        <div class="row">
            <div class="col-1">
                <span v-if="tag" class="badge" :class="tag"><font-awesome-icon v-if="icon" :icon="icon" /></span>
                <span v-else class="badge badge-info">{{ index }}</span>
            </div>
            <div class="col-5 col-md-7">
                {{ user.username }}
            </div>            
            <div class="col-3 col-md-2"><font-awesome-icon class="purple" icon="comments" />&nbsp;{{ user.comment_count }}</div>
            <div class="col-3 col-md-2"><font-awesome-icon class="golden" icon="cookie" />&nbsp;{{ user.karma_count }}</div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'UserRow',
    props: {
        user: Object,
        index: Number,
        icon: String,
        tag: String
    }
}
</script>
