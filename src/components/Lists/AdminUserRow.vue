<template>
    <li class="list-group-item">
        <div class="row admin-row">
            <div class="col-md-8 col-12">
                {{ user.username }}
            </div>
            <div class="col-md-4 col-12">
                <span class="col-5">
                    <span><font-awesome-icon class="purple" icon="comments" />&nbsp;{{ user.comment_count }}&nbsp;</span>
                    <span><font-awesome-icon class="golden" icon="cookie" />&nbsp;{{ user.karma_count }}</span>
                </span>
                <span class="col-5">
                    <button class="btn btn-sm btn-warning small-margin">Ban</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </span>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'AdminUserRow',
    props: {
        user: Object
    }
}
</script>

<style scoped>
.admin-row span {
    padding: 5px;
}

.admin-row div {
    padding: 5px;
}
</style>
