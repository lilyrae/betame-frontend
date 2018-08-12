<template>
  <div id="app" class="beta-text">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<!-- Global style for app -->
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

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

.beta-innerbar {
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

.beta-jumbotron {
  margin-top: 40px;
  border: 1px dashed #312e2b;
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #312e2b, 0 0 0 10px #fff, 0 0 2px 10px #000000;
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
  color: #312e2b;
}

#topic-select .selected-tag {
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
  color: #312e2b;
}

#tag-select .selected-tag {
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
