<template>
  <div>
    <h1>{{ page.title.rendered }}</h1>

    <component-renderer :components="page.acf.components"/>
  </div>
</template>

<script>
import ComponentRenderer from "../components/ComponentRenderer";

export default {
  name: "page",
  components: {
    ComponentRenderer
  },
  asyncData: ({ store, route }) => {
    return store.dispatch("requestPageBySlug", { slug: route.params.slug });
  },
  computed: {
    page() {
      return this.$store.state.pages[this.$route.params.slug];
    }
  }
};
</script>

<style>
h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
