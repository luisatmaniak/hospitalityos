<template>
  <slider>
    <slide>
      <img :src="image_1" alt="">
    </slide>
    <slide>
      <img :src="image_2" alt="">
    </slide>
  </slider>
</template>

<script>
  import Slider from './Slider'
  import Slide from './Slide'

  export default {
    props: ['image_2', 'image_1'],
    component: {
      Slider,
      Slide
    }
  }
</script>
