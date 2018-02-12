<template>
  <slider>
    <slide v-for="(slide, index) in slides" class="slide" :key="index">
      <component-renderer :components="slide.components"/>
    </slide>
  </slider>
</template>

<script>
import Slider from "./Slider";
import Slide from "./Slide";
import ComponentRenderer from "./ComponentRenderer";

export default {
  props: ["slides"],
  components: {
    Slider,
    Slide,
    ComponentRenderer
  }
};
</script>
