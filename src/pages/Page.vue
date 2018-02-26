<template>
  <div>
    <h1>{{ page.title.rendered }}</h1>

    <component-renderer :components="page.acf.components"/>
  </div>
</template>

<script>
import ComponentRenderer from '../components/ComponentRenderer'
import { pageBySlug, requestPageBySlug } from '../core/store/pages'

export default {
  name: 'Page',
  components: {
    ComponentRenderer,
  },
  asyncData: ({ store, route }) => {
    return store.dispatch(requestPageBySlug, { slug: route.params.slug })
  },
  computed: {
    page() {
      return this.$store.getters[pageBySlug](this.$route.params.slug)
    },
  },
}
</script>
