<template>
  <v-container class="mb-10">
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
      <LikeButton />
    </div>
    <div class="mt-5">
      <BondAvatar
        yourPhoto="https://avatars.githubusercontent.com/u/42372656?v=4"
        partnerPhoto="https://www.superselected.com/wp-content/uploads/2019/02/Black-Woman-Braided-Hair.jpg"
      />
    </div>
    <div class="mt-5">
      <ProfileAvatar
        img="https://avatars.githubusercontent.com/u/42372656?v=4"
      />
    </div>
    <v-card class="mt-5">
      <Appbar routeToHome="/auth" routeToProfile="/profile" />
    </v-card>
  </v-container>
</template>
<script>
import Button from "@/components/userComponents/Button.vue";
import ButtonGoogle from "@/components/userComponents/ButtonGoogle.vue";
import LikeButton from "@/components/userComponents/LikeButton.vue";
import BondAvatar from "@/components/userComponents/BondAvatar.vue";
import ProfileAvatar from "@/components/userComponents/ProfileAvatar.vue";
import Appbar from "@/components/userComponents/Appbar.vue";

export default {
  components: {
    Button,
    ButtonGoogle,
    LikeButton,
    ProfileAvatar,
    Appbar,
    BondAvatar,
  },
};
</script>