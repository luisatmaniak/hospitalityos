<template>
  <div>
    <template v-for="(component, index) in components">
      <os-button v-if="component.acf_fc_layout === 'button'" v-bind="component" :key="index"/>

      <complex-component v-if="component.acf_fc_layout === 'complex_component'" v-bind="component" :key="index"/>

      <acf-slider v-if="component.acf_fc_layout === 'slider'" v-bind="component" :key="index"/>

      <two-image-slider v-if="component.acf_fc_layout === 'custom_2_image_slider'" v-bind="component" :key="index"/>

      <br :key="index + 'br1'">
      <br :key="index + 'br2'">
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  props: { components: { type: Object, required: true } },
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
