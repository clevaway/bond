<template>
  <!-- component for the RegularBtn -->
  <v-btn
    class="__RegularBtn"
    depressed
    color="neutralgray"
    rounded
    min-width="120"
    @click="$emit('click')"
  >
    <img
      src="https://freepngimg.com/thumb/google/66893-guava-logo-google-plus-suite-png-image-high-quality.png"
      width="25"
      class="mr-2"
    />
    {{ text }}
  </v-btn>
  <!-- / component for the RegularBtn -->
</template>
<script>
export default {
  props: {
    text: String,
  },
};
</script>
<style >
.__RegularBtn {
  text-transform: initial;
}
</style>