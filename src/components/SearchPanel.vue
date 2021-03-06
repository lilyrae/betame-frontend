<template>
    <div class="inner-panel text-left hide-overflow beta-bg">
        <button class="btn close" @click="hide">x</button>
        <h3 class="beta-title">Advanced Search</h3>
        <hr class="title-hr">
        <div class="form-group">
            <label>Title</label>
            <div>
                <input v-model="filterTitle" type="text" class="form-control" maxlength="100">
            </div>
        </div>
        <hr class="title-hr">
            Authors
            <v-select
                v-model="selectedAuthors"
                :options="authorOptions"
                @search="onSearchAuthors"
                label="username"
                class="search-select"
                multiple
                >
                <template slot="no-options">
                    Please type to search..
                </template>
            </v-select>
        <hr class="title-hr">
            Tags
            <v-select
                v-model="filterTags"
                :options="tagOptions"
                @search="onSearchTags"
                label="text"
                class="search-select"
                multiple
                >
                <template slot="no-options">
                    Please type to search..
                </template>
                <template slot="option" slot-scope="option">
                    <span class="badge badge-pill" :class="getTagClass(option.tag_type_id)">+</span>&nbsp;&nbsp;
                    <span class="tag-dropdown">{{ option.text }}</span>
                </template>
                <template slot="selected-option" slot-scope="option">
                    <span class="select-tag" :class="getTagClass(option.tag_type_id)">{{ option.text }}</span>
                </template>
            </v-select>
        <hr class="title-hr">
            Rating
            <v-select
                v-model="selectedRatings"
                :options="ratingOptions"
                label="shortLabel"
                class="search-select"
                multiple
                >
            </v-select>
        <hr class="title-hr">
        <div class="form-group">
            <label>Published</label>
            <div>
                <datepicker class="beta-datepicker" :format="dateFormat" v-model="fromDate" placeholder="From"></datepicker>
            </div>
        </div>
        <div class="form-group">
            <div>
                <datepicker class="beta-datepicker" :format="dateFormat" v-model="untilDate" placeholder="To"></datepicker>
            </div>
        </div>
        <hr class="title-hr">
        <div class="form-group">
            <label>Word Count</label>
            <div>
                <input v-model="minWordCount" type="number" class="form-control" placeholder="More than" min="0" max="50000" required maxlength="5">
            </div>
        </div>
        <div class="form-group">
            <div>
                <input v-model="maxWordCount" type="number" class="form-control" placeholder="Less than" min="1" max="50000" required maxlength="5">
            </div>
        </div>
        <hr class="title-hr">
        <button class="btn btn-info" @click="search">Search</button>
        <button class="btn btn-outline-secondary" @click="clear">Clear</button>
    </div>
</template>

<script>
import userService from '../services/user.js'
import ratingService from '../services/rating.js'
import tagService from '../services/tag.js'
import debounce from 'debounce'
import Datepicker from 'vuejs-datepicker'

export default {
    name: 'SearchPanel',
    components: {
        Datepicker
    },
    data() {
        return {
            selectedAuthors: [],
            authorOptions: [],
            selectedRatings: [],
            tagOptions: [],
            minWordCount: null,
            maxWordCount: null,
            fromDate: null,
            untilDate: null,
            dateFormat: "D dsu MMM yyyy"
        }
    },
    methods: {
        async search() {
            let userIds = this.selectedAuthors.map((author) => {
                return author.user_id
            }).join(',')
            let ratings = this.selectedRatings.map((rating) => {
                return rating.value
            }).join(',')

            let fromDate = this.fromDate ? new Date(this.fromDate).toISOString() : null
            let untilDate = this.untilDate ? new Date(this.untilDate).toISOString() : null

            this.$store.dispatch('story/searchStories', {
                search: {
                    userIds,
                    ratings,
                    fromDate,
                    untilDate,
                    minWordCount: this.minWordCount,
                    maxWordCount: this.maxWordCount
                }
            })
        },
        clear() {
            this.filterTitle = ''
            this.selectedAuthors = []
            this.selectedRatings = []
            this.filterTags = []
            this.minWordCount = null
            this.maxWordCount = null
            this.fromDate = null
            this.untilDate = null
        },
        hide() {
            this.$emit('hide')
        },
        onSearchAuthors(query, loading) {
            loading(true);
            this.searchAuthors(loading, query, this);
        },
        searchAuthors: debounce(async (loading, query, self) => {
            const response = await userService.search(query)
            self.authorOptions = response.data;
            loading(false);
        }, 350),
        onSearchTags(query, loading) {
            loading(true);
            this.searchTags(loading, query, this);
        },
        searchTags: debounce(async (loading, query, self) => {
            const response = await tagService.searchWithText(query)
            self.tagOptions = response.data;
            loading(false);
        }, 350),
        getTagClass(tagTypeId) {
            return tagService.tagClass(tagTypeId)
        }
    },
    computed: {
        ratingOptions() {
            return ratingService.all();
        },
        filterTitle: {
            get () {
                return this.$store.state.story.filterTitle
            },
            set (value) {
                this.$store.commit('story/filterTitle', value)
            }
        },
        filterTags: {
            get () {
                return this.$store.state.story.filterTags
            },
            set (value) {
                this.$store.commit('story/filterTags', value)
            }
        }
    }
}
</script>

<style>
.inner-panel {
    padding: 25px;
    margin: 5px;
    margin-top: 0px;
    padding-bottom: 60px;
    min-width: 350px;
    position: relative;
}

.beta-datepicker input{
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}

.beta-bg {
    background-color: #bfdde2;
    border-radius: 0.3rem;
}

.search-select input {
    background-color: #fff !important;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}

.inner-panel .dropdown-toggle {
    background-color: #fff !important;
    overflow: hidden;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}

.selected-tag {
    font-size: 14px;
}

.select-tag {
    padding: 4px .25em;
    border-radius: 4px;
    white-space: nowrap;
    overflow: hidden;
}
/* 
IDEA: fix panel when scroll down
@media only screen and (min-width: 876px) {
    .inner-panel {
        position: fixed;
        top: 80px;
        left: 20px;
    }
} */
</style>