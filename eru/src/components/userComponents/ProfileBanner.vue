<template>
  <span>
    <v-parallax height="200" :src="parallaxImage"> </v-parallax>
  </span>
</template>
<script>
export default {
  props: {
    parallaxImage: String,
  },
};
</script>