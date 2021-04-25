<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <!-- show footer only if the user isn't logged in -->
    <Footer v-if="!loggedIn" />
    <!-- show app bar only if the user is logged in -->
    <Appbar v-if="loggedIn" routeToHome="/" routeToProfile="/u/profile" />
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Appbar from "@/components/userComponents/Appbar.vue";
import Footer from "./components/Footer";
import store from "./store";

export default {
  name: "App",

  components: {
    Appbar,
    Footer,
  },

  data() {
    return {};
  },
  computed: {
    // if the user is logged in display the appbar
    loggedIn() {
      return store.state.currentUser;
    },
  },
};
</script>
