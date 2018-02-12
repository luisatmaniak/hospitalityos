<template>
  <div class="slider">
    <h3>Slider</h3>
    <slot>
      An empty slider
    </slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.slider {
  border: 2px dashed blue;
  padding: 20px;
}

h3 {
  margin-top: 0;
}
</style>
