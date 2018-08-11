<template>
  <div class="hello container">
    <nav class="navbar navbar-expand-sm navbar-dark fixed-top background-black">
      <!-- Brand -->
    <a class="navbar-brand beta-title" href="#">Beta me.</a>

      <!-- Links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link beta-text" href="#">About</a>
        </li>
      </ul>
    </nav>
    <br>
    <div class="jumbotron">
        <h3 class="beta-title">Thank you for submitting your story on <strong>Beta me</strong>!</h3>
        <br>
        <div class="lead">
        <div class="col-sm-8 offset-sm-2">
        <p class="beta-text">I would love to hear your feedback on how to improve this site. Please feel free to send a message.</p>
        <textarea width="100%"></textarea>
        </div>
        </div>

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
          id: 1
        },
        {
          label: 'French',
          id: 2
        },
        {
          label: 'Spanish',
          id: 3
        }
      ],
      topicOptions: [
        {
          label: 'Biology',
          id: 4
        },
        {
          label: 'Harry Potter',
          id: 5
        },
        {
          label: 'Haikyuu!!',
          id: 6
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


#topic-select {
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


#tag-select {
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
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
