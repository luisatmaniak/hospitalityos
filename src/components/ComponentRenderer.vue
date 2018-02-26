<template>
  <div>
    <div v-for="(component, index) in components" :key="index">
      <os-button v-if="component.acf_fc_layout === 'button'" v-bind="component" />

      <complex-component v-if="component.acf_fc_layout === 'complex_component'" v-bind="component" />

      <acf-slider v-if="component.acf_fc_layout === 'slider'" v-bind="component"/>

      <two-image-slider v-if="component.acf_fc_layout === 'custom_2_image_slider'" v-bind="component" />

      <br :key="index + 'br1'">
      <br :key="index + 'br2'">
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: { components: { type: [Array, Boolean], required: true } },
  beforeCreate() {
    this.$options.components = {
      ...this.$options.components,
      OsButton: () => import('./OsButton'),
      ComplexComponent: () => import('./ComplexComponent'),
      AcfSlider: () => import('./AcfSlider'),
      TwoImageSlider: () => import('./TwoImageSlider'),
    }
  },
}
</script>
