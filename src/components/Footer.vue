<template>
  <center>
    <v-footer class="__footer">
      <v-flex class="text-xs-center"
        >Bond © {{ new Date().getFullYear() }}. Open Source Project.</v-flex
      >
    </v-footer>
  </center>
</template>
<style scoped>
.__footer {
  color: #5f6368;
  font-size: 14.5px;
  background: #f2f2f2;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>