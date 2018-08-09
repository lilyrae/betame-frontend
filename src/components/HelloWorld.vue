<template>
  <div class="hello container">
    <nav class="navbar navbar-expand-sm navbar-dark fixed-top background-black">
      <!-- Brand -->
    <a class="navbar-brand beta-title" href="#">Beta me.</a>

      <!-- Links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link beta-text" href="#">Sign up</a>
        </li>
        <li class="nav-item">
          <a class="nav-link beta-text" href="#">Log in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link beta-text" href="#">About</a>
        </li>
      </ul>
    </nav>
    <br>
    <nav class="navbar navbar-light bg-light big-margin beta-search-bar">
      <form class="form-inline">
        <input class="form-control mr-sm-4 my-6" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
      </form>
      <span class="navbar-text">
        <button class="btn btn-danger" @click="showModal = true">
          New <i class="fas fa-pen-fancy"></i>
        </button>
      </span>
    </nav>
    <ul class="list-group list-group-flush">
      <li class="list-group-item beta-text" v-for="story in stories">
        <h4>{{ story.title }} <span class="font18 grey">by {{ story.author }}</span></h4>
        
        <p>{{ story.intent }}</p>
        <span v-for="tag in story.tags" class="badge beta-grey-badge small-margin">{{ tag }}</span>
        <span v-for="tag in story.tags" class="badge beta-blue-badge small-margin">{{ tag }}</span>
        <span v-for="tag in story.tags" class="badge beta-dark-blue-badge small-margin">{{ tag }}</span>
        <span v-for="tag in story.tags" class="badge badge-info small-margin">{{ tag }}</span>
      </li>
    </ul>
    <!-- The Modal -->
    <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">

        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title beta-text">Create New Post</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                </div>
                <div class="modal-body beta-text">
                  <form>
                  <div class="form-group row">
                    <label for="title" class="col-sm-2 col-form-label">Title</label>
                    <div class="col-sm-9">
                      <input type="title" class="form-control" placeholder="Brave New World">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="intent" class="col-sm-2 col-form-label">Intent</label>
                    <div class="col-sm-9">
                      <textarea type="intent" class="form-control" placeholder="I want to tell a story about.."></textarea>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="url" class="col-sm-2 col-form-label">Link</label>
                    <div class="col-sm-9">
                      <input type="url" class="form-control" placeholder="https://docs.google.com/document/d/1umopb9lKxII6bwK2GDS0BN1xJg2O4MHrw-dBJTeEqn4/edit?usp=sharing">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="language" class="col-sm-2 col-form-label">Language</label>
                    <div class="col-sm-9">
                      <v-select id="language-select" v-model="language" :options="languageOptions"></v-select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="topics" class="col-sm-2 col-form-label">Topics</label>
                    <div class="col-sm-9">
                      <v-select id="topic-select" v-model="topics" :options="topicOptions" multiple taggable></v-select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="tags" class="col-sm-2 col-form-label">Tags</label>
                    <div class="col-sm-9">
                      <v-select id="tag-select" v-model="tags" :options="tagOptions" multiple taggable></v-select>
                    </div>
                  </div>
            </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" @click="showModal = false">Close</button>
                    <button type="button" class="btn btn-info">Create</button>
                </div>
            </div>
        </div>

        </div>
      </div>
    </transition>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      stories: [],
      topics: null,
      showModal: false,
      tags: null,
      language: null,
      languageOptions: [
        {
          label: 'English',
          code: 'en'
        },
        {
          label: 'French',
          code: 'fr'
        },
        {
          label: 'Spanish',
          code: 'es'
        }
      ],
      topicOptions: [
        {
          label: 'Biology',
          id: 1
        },
        {
          label: 'Harry Potter',
          id: 2
        },
        {
          label: 'Haikyuu!!',
          id: 3
        },
      ],
      tagOptions: [
        {
          label: 'First Post',
          id: 1
        },
        {
          label: 'Go easy on me!',
          id: 2
        },
        {
          label: 'Constructive criticism',
          id: 3
        },
      ],
    }
  },
  props: {
    msg: String
  },
  created: function () {
    this.getStories()
  },
  methods: {
    getStories() {
      this.stories = [
        {
          id: 1,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about life and death',
          tags: ['first time', 'creative']
        },
        {
          id: 2,
          title: 'Fighting the odds',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Suet',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['rip it to shreds', 'HP universe']
        },
        {
          id: 3,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Nemo',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['first time', 'creative']
        },
        {
          id: 4,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Alice in Wonderland',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['first time', 'creative']
        },
        {
          id: 5,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['first time', 'creative']
        },
        {
          id: 5,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['first time', 'creative']
        },
        {
          id: 5,
          title: 'The Grand Adventure',
          link: 'https://drive.google.com/open?id=1XWZsXvPzeVPzXPdi9hPblUT620m8E5YPaiVPPoO0aKg',
          author: 'Lily B',
          intent: 'For this story, I am trying to explore ideas about adventures',
          tags: ['first time', 'creative']
        },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.beta-title {
  font-family: 'PT Mono', monospace;
}

.beta-text {
  font-family: 'PT Sans', sans-serif;
  color: #312e2b;
  text-align: left;
}

.red {
  color: #a44b4c;
}

.background-black {
  background-color: #312e2b;
}

.background-white {
  background-color: #f9f1f4;
}

.background-grey {
  background-color: #bfada3;
}

.grey {
  color: #bfada3;
}

.light-brown {
  color: #c99e8d;
}

.white {
  color: #f9f1f4;
}

.font18 {
  font-size: 18px;
}

.small-margin {
  margin: 2px;
}

.medium-margin {
  margin: 5px;
}

.big-margin {
  margin: 40px;
}

.beta-search-bar {
  margin-left: 0px;
  margin-right: 0px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.beta-badge {
  border-color: #dc3545;
  border: 1px;
  border-style: solid;
  color: #dc3545;
}

.beta-dark-blue-badge {
  background-color: #23C9FF;
}

.beta-blue-badge {
  background-color: #80CED7;
}

.beta-grey-badge {
  background-color: #7C77B9;
  color: #fff;
}

#language-select {
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
}

#language-select .selected-tag {
    color: #fff;
    background-color: #7C77B9;
}

#language-select.dropdown.open .dropdown-toggle,
#language-select.dropdown.open .dropdown-menu {
    border-color: #7C77B9;
}

#language-select .active a {
    background: rgba(124,119,185,.5);;
    color: #fff;
}

#language-select.dropdown .highlight a,
#language-select.dropdown li:hover a {
    background: #7C77B9;
    color: #fff;
}

.v-select {
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
}

#topic-select .selected-tag {
    color: #147688;
    background-color: #80CED7;
    border-color: #80CED7;
}

#topic-select.dropdown.open .dropdown-toggle,
#topic-select.dropdown.open .dropdown-menu {
    border-color: #80CED7;
}

#topic-select .active a {
    background: rgba(50,50,50,.1);
    color: #333;
}

#topic-select.dropdown .highlight a,
#topic-select.dropdown li:hover a {
    background: #80CED7;
    color: #fff;
}

#tag-select .selected-tag {
    color: #147688;
    background-color: #23C9FF;
    border-color: #23C9FF;
}

#tag-select.dropdown.open .dropdown-toggle,
#tag-select.dropdown.open .dropdown-menu {
    border-color: #23C9FF;
}

#tag-select .active a {
    background: rgba(50,50,50,.1);
    color: #333;
}

#tag-select.dropdown .highlight a,
#tag-select.dropdown li:hover a {
    background: #23C9FF;
    color: #fff;
}
</style>
