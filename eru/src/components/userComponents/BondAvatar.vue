<template>
  <span>
    <v-avatar class="profileBorder __you" color="neutralgray" size="120">
      <v-img contain :src="yourPhoto" alt="default" />
    </v-avatar>
    <v-avatar
      class="profileBorder __partnerOverlay"
      color="neutralgray"
      size="120"
    >
      <v-img contain :src="partnerPhoto" alt="default" />
    </v-avatar>
  </span>
</template>

<script>
export default {
  props: {
    yourPhoto: String,
    partnerPhoto: String,
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
.__partnerOverlay {
  position: sticky;
  margin-left: -46px;
}
.__you {
  z-index: 1;
}
</style>