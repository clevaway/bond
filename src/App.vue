<template>
  <v-app>
    <Appbar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    Appbar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
