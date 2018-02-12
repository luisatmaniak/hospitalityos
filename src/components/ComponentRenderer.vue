<template>
  <div>
    <template v-for="component in components">
      <os-button v-if="component.acf_fc_layout === 'button'" v-bind="component"/>

      <complex-component v-if="component.acf_fc_layout === 'complex_component'" v-bind="component"/>

      <acf-slider v-if="component.acf_fc_layout === 'slider'" v-bind="component"/>

      <br>
      <br>
    </template>
  </div>
</template>

<script>
// import OsButton from "./OsButton";
// import ComplexComponent from "./ComplexComponent";

export default {
  props: ["components"],
  components: {},
  beforeCreate() {
    this.$options.components = {
      ...this.$options.components,
      OsButton: () => import("./OsButton"),
      ComplexComponent: () => import("./ComplexComponent"),
      AcfSlider: () => import("./AcfSlider"),
    };
  }
};
</script>
