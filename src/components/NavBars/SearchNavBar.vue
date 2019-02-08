<template>
    <div>
        <nav class="navbar navbar-light bg-light big-margin beta-innerbar">
            <!-- Temporary Frontend Search  -->
            <form class="form-inline col-lg-8 col-md-12" v-on:submit.prevent="search">
                <div class="col-md-10 no-sm-padding">
                    <input v-model="query" class="beta-search search-bar my-6" type="text" placeholder="Search" aria-label="Search">
                </div>
                <button 
                    class="btn btn-outline-info col-md-2 my-2 my-md-0 no-sm-padding ld-ext-right"
                    type="submit"
                    :class="{'running': isSearching }"
                    >
                    Search
                    <div class="ld ld-ring ld-spin"></div>
                </button>
            </form>
            <div class="hide">
                <router-link v-if="!loggedIn" class="btn btn-danger" to="/login">Login to Post <font-awesome-icon icon="pen-nib" /></router-link>
                <router-link v-if="loggedIn" class="btn btn-danger" to="/story/new">New <font-awesome-icon icon="pen-nib" /></router-link>
            </div>
        </nav>
    </div>
</template>

<script>
import auth from '../../services/auth.js'

export default {
    name: 'SearchNavBar',
    data() {
        return {
            query: "",
            loggedIn: false,
            isSearching: false
        }
    },
    methods: {
        search() {
            this.isSearching = true;

            Event.$emit('searching', {
                query: this.query
            });
        }
    },
    mounted() {
        Event.$on('loggedOut', () => {
            this.loggedIn = auth.isLoggedIn();
        });
        Event.$on('loggedIn', () => {
            this.loggedIn = auth.isLoggedIn();
        });
        Event.$on('finishedSearch', () => {
            this.isSearching = false;
        });
        this.loggedIn = auth.isLoggedIn();
    }
}
</script>

<style scoped>
.beta-search {
    width: 100%;
}

.search-bar {
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

@media (max-width: 992px) {
    .hide {
        display: none;
    }
}

@media (max-width: 768px) {
    .no-sm-padding {
        padding-left: 0px;
        padding-right: 0px;
    }
}
</style>