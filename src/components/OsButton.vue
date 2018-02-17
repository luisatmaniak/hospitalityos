<template>
  <a v-if="link" href="link">{{text}}</a>
  <button v-else>Prefix: {{text}}</button>
</template>

<script>
export default {
  props: ['text', 'link'],
}
</script>
