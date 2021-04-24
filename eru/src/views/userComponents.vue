<template>
  <v-container>
    <center>
      <h3>This component shows you all the built components to be uses</h3>
    </center>
    <div class="mt-5">
      <Button text="Button" />
    </div>
    <div class="mt-5">
      <Button text="Button" loading />
    </div>
    <div class="mt-5">
      <Button text="Button" disabled />
    </div>
    <div class="mt-5">
      <ButtonGoogle text="Button" />
    </div>
    <div class="mt-5">
      <LikeButton/>
    </div>
  </v-container>
</template>
<script>
import Button from "@/components/userComponents/Button.vue";
import ButtonGoogle from "@/components/userComponents/ButtonGoogle.vue";
import LikeButton from "@/components/userComponents/LikeButton.vue";

export default {
  components: {
    Button,
    ButtonGoogle,
    LikeButton,
  },
};
</script>