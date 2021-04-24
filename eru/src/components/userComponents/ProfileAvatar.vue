<template>
  <span>
    <v-avatar color="neutralgray" size="120" class="profileBorder">
      <v-img contain :src="img" alt="default" />
    </v-avatar>
    <img
      class="__iconaddphoto"
      src="../../assets/icons/iconaddphoto.png"
      alt="iconaddphoto"
    />
  </span>
</template>

<script>
export default {
  props: {
    img: String,
  },
};
</script>

<style>
.profileBorder {
  border: 8px solid;
}
.__iconaddphoto {
  margin-top: 82px;
  margin-left: -34px;
  position: fixed;
  cursor: pointer;
}
</style>