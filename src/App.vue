<template>
  <div id="app">
    <router-link to="/test">Test page one</router-link>
    <router-link to="/test2">Test page two</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  components: {},
}
</script>

<style lang="scss">
@import './core/style/reboot.scss';
</style>
