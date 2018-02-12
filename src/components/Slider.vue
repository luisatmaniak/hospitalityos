<template>
  <div class="slider">
    <h3>Slider</h3>
    <div v-for="slide in slides" class="slide">
      <component-renderer :components="slide.components"/>
    </div>
  </div>
</template>

<script>
import ComponentRenderer from "./ComponentRenderer";

export default {
  props: ["slides"],
  components: {
    ComponentRenderer
  }
};
</script>

<style scoped>
  .slider {
    border: 2px dashed blue;
    padding: 20px;
  }
  .slide {
    border: 1px dotted teal;
    margin-bottom: 20px;
    padding: 10px;

  }
  h3 {
    margin-top:0;
  }
</style>
