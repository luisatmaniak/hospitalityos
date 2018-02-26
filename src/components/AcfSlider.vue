<template>
  <slider>
    <slide v-for="(slide, index) in slides" :key="index" class="slide">
      <hos-component-renderer :components="slide.components"/>
    </slide>
  </slider>
</template>

<script>
import HosComponentRenderer from '../core/components/HosComponentRenderer'
import Slide from './Slide'
import Slider from './Slider'

export default {
  components: {
    HosComponentRenderer,
    Slider,
    Slide,
  },
  props: { slides: { type: Array, required: true } },
}
</script>
