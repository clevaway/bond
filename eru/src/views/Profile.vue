<template>
  <div class="about">
    <ProfileBanner
      parallaxImage="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    />
    <v-row class="mt-n16 ma-0" align="center" justify="center">
      <v-col class="text-center" cols="12">
        <ProfileAvatar :img="currentUser.photoURL" />
        <h2 class="mt-3 font-weight-light">{{ currentUser.displayName }}</h2>
        <p class="mt-1 font-weight-light">{{ currentUser.email }}</p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ProfileBanner from "@/components/userComponents/ProfileBanner.vue";
import ProfileAvatar from "@/components/userComponents/ProfileAvatar.vue";
import store from "@/store";

export default {
  components: {
    ProfileBanner,
    ProfileAvatar,
  },
  data() {
    return {
      currentUser: store.state.currentUser,
    };
  },
  mounted: function () {
    this.getCurrentUserLoggedIn();
  },
  methods: {
    // function to get curren logged in user
    getCurrentUserLoggedIn() {
      this.currentUser = store.state.currentUser;
      console.log(this.currentUser);
    },
  },
};
</script>
