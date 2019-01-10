<template>
  <div id="app" class="beta-text">
    <router-view></router-view>
  </div>
</template>

<script>
import('bootstrap/dist/css/bootstrap.css')

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

.hide-overflow {
  text-overflow: ellipsis;
  overflow: hidden;
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

.font14 {
  font-size: 14px;
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
  color: white;
  background-color: #23C9FF;
}

.badge {
  font-size: 85%;
}

.beta-blue-badge {
  color: white;
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

.beta-frame {
  border-radius:30px;
  -moz-border-radius:30px;
  -webkit-border-radius:30px;
}

#language-select {
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
  background-color: #fff;
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
  background-color: #fff;
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
  background-color: #fff;
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

.beta-link { color: inherit; }

.beta-link:hover {
  color: #3e828e;
}

#loading image
.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
}
.lds-circle > div {
  display: inline-block;
  width: 51px;
  height: 51px;
  margin: 6px;
  border-radius: 50%;
  background: #3e828e;
  animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
@keyframes lds-circle {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #3e828e;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}

.loading-screen {
    margin: 50px;
}

/* Tooltip container */
.betame-tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.betame-tooltip .betame-tooltiptext {
  visibility: hidden;
  width: 250px;
  background-color: #312e2b;
  color: #fff;
  text-align: center;
  padding: 10px;
  border-radius: 6px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -160px;
}

/* Show the tooltip text when you mouse over the tooltip container */
.betame-tooltip:hover .betame-tooltiptext {
  visibility: visible;
}

.betame-button {
  color: #312e2b;
  background-color: #bfdde2!important;
}

.betame-dark-button {
  color: white;
  background-color: #17a2b8!important;
}

.betame-light-button {
  color: white;
  background-color: #c2cad2;
  border-color: #f8f9fa;
}

.btn-success {
    color: #fff;
    background-color: #58a068;
    border-color: #58a068;
}

.btn-danger {
  background-color: #de515e;
}

.betame-red {
  color: #de515e;
}
</style>
