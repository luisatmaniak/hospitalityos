<template>
  <div id="app">
    <router-link to="/test">Test page one</router-link>
    <router-link to="/test2">Test page two</router-link>
    <router-view></router-view>
  </div>
</template>

<style>
body {
  font-family: Helvetica, sans-serif;
}

#app > a {
  color: red;
  margin: 0 10px;
  display: inline-block;
}
</style>
