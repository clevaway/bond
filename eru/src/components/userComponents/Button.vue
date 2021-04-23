<template>
  <!-- component for the RegularBtn -->
  <span>
    <v-btn
      v-if="loading"
      class="__RegularBtn"
      depressed
      color="error"
      rounded
      min-width="120"
      loading
    >
    </v-btn>
    <v-btn
      v-else-if="disabled"
      class="__RegularBtn disabled"
      depressed
      color="#fd6868"
      rounded
      min-width="120"
      disabled
    >
      {{ text }}
    </v-btn>
    <v-btn
      v-else
      class="__RegularBtn"
      depressed
      color="error"
      rounded
      min-width="120"
    >
      {{ text }}
    </v-btn>
  </span>
  <!-- / component for the RegularBtn -->
</template>
<script>
export default {
  props: {
    text: String,
    loading: Boolean,
    disabled: Boolean,
  },
};
</script>
<style >
.__RegularBtn {
  text-transform: initial;
}
.__RegularBtn.disabled {
  background-color: #fd6868;
}
</style>