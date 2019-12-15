<template>
    <div class="bg-light">
        <nav class="navbar navbar-light search-navbar beta-innerbar">
            <!-- Temporary Frontend Search  -->
            <form v-show="showSimpleSearch" class="form-inline col-lg-8 col-md-12" v-on:submit.prevent="search">
                <div class="col-md-10 no-sm-padding">
                    <input v-model="query" class="beta-search search-bar my-6" type="text" placeholder="Search" aria-label="Search">
                </div>
                <button 
                    class="btn btn-outline-info col-md-2 my-2 my-md-0 no-sm-padding ld-ext-right"
                    type="submit"
                    :class="{'running': isSearching }"
                    >
                    Quick <font-awesome-icon icon="search" />
                    <div class="ld ld-ring ld-spin"></div>
                </button>
            </form>
            <div class="hide float-right">
                <router-link v-if="!loggedIn" class="btn btn-danger" to="/login">Login to Post <font-awesome-icon icon="pen-nib" /></router-link>
                <router-link v-if="loggedIn" class="btn btn-danger" to="/story/new">New <font-awesome-icon icon="pen-nib" /></router-link>
            </div>
        </nav>
        <div class="text-left">
            <a class="beta-link text-muted advanced-search" v-if="hasAdvancedSearch && showSimpleSearch" @click="toggleAdvancedSearch">Advanced Search <font-awesome-icon icon="search" /></a>
            <p class="font18 search-tags">
                <TagList @clickedTag="removeTag" :tags="searchTags" :deletable="true" />
            </p>
        </div>
    </div>
</template>

<script>
import TagList from '../Lists/TagList.vue'
import auth from '../../services/auth.js'
import { EventBus } from '../../event-bus.js'

export default {
    name: 'SearchNavBar',
    components: {
        TagList
    },
    props: {
        hasAdvancedSearch: {
            type: Boolean,
            default: false
        },
        showSimpleSearch: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            query: "",
            loggedIn: false,
            isSearching: false,
            searchTags: []
        }
    },
    methods: {
        search() {
            this.isSearching = true

            Event.$emit('searching', {
                query: this.query,
                tags: this.searchTags
            })
        },
        toggleAdvancedSearch() {
            this.$emit('toggleAdvancedSearch')
        },
        removeTag({tag}) {
            this.searchTags = this.searchTags.filter(searchTag => {
                return searchTag.tag_id != tag.tag_id
            })
            this.search()
        }
    },
    mounted() {
        EventBus.$on('searchTag', ({tag}) => {
            let searchTagIds =  this.searchTags.map(searchTag => {
                return searchTag.tag_id
            })
            if (!searchTagIds.includes(tag.tag_id)) {
                this.searchTags.push(tag)
            }
            this.search()
        })
        Event.$on('loggedOut', () => {
            this.loggedIn = auth.isLoggedIn()
        })
        Event.$on('loggedIn', () => {
            this.loggedIn = auth.isLoggedIn()
        })
        Event.$on('finishedSearch', () => {
            this.isSearching = false
        })
        this.loggedIn = auth.isLoggedIn()
    },
    beforeDestroy() {
        EventBus.$off('searchTag')
    }
}
</script>

<style scoped>
.search-tags {
    padding: 10px;
    padding-left: 50px;
}
.search-navbar {
    margin-bottom: 0px;
}

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

    .search-tags {
        padding-left: 20px;
    }
}

.advanced-search {
    margin-left: 50px;
}
</style>