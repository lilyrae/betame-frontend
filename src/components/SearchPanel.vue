<template>
    <div class="inner-panel text-left hide-overflow beta-bg">
        <h3 class="beta-title">Advanced Search</h3>
        <hr class="title-hr">
        <div class="form-group">
            <label>Title</label>
            <div>
                <input v-model="title" type="text" class="form-control" maxlength="100">
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
                    Loading..
                </template>
            </v-select>
        <hr class="title-hr">
            Tags
            <v-select
                v-model="selectedTags"
                :options="tagOptions"
                @search="onSearchTags"
                label="text"
                class="search-select"
                multiple
                >
                <template slot="no-options">
                    Loading..
                </template>
                <template slot="option" slot-scope="option">
                    <span :class="getTagClass(option.tag_type_id)">{{ option.text }}</span>
                </template>
                <template slot="selected-option" slot-scope="option">
                    <span :class="getTagClass(option.tag_type_id)">{{ option.text }}</span>
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
            <a class="help beta-link text-muted"><u>Configure your default rating</u></a>
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
                <input v-model="moreThanWordCount" type="number" class="form-control" placeholder="More than" min="0" max="50000" required maxlength="5">
            </div>
        </div>
        <div class="form-group">
            <div>
                <input v-model="lessThanWordCount" type="number" class="form-control" placeholder="Less than" min="1" max="50000" required maxlength="5">
            </div>
        </div>
        <hr class="title-hr">
        <button class="btn btn-info" @click="hide">Search</button>
        <button class="btn btn-outline-secondary" @click="hide">Hide Search</button>
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
            title: '',
            selectedAuthors: [],
            authorOptions: [],
            selectedRatings: [],
            selectedTags: [],
            tagOptions: [],
            moreThanWordCount: null,
            lessThanWordCount: null,
            fromDate: null,
            untilDate: null,
            dateFormat: "D dsu MMM yyyy"
        }
    },
    methods: {
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
            return {'text-info': (tagTypeId == 1)}
        }
    },
    computed: {
        ratingOptions() {
            return ratingService.all();
        }
    }
}
</script>

<style>
.inner-panel {
    padding: 25px;
    margin: 5px;
    margin-top: 0px;
    padding-bottom: 40px;
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
</style>