<template>
  <div>
    <v-app-bar app :color="defaultAppBarColour" dense dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <router-link to="/">
        <v-toolbar-title id="logo"
          >Connected <sup>v 0.1.0</sup>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <a href="#">
        <v-btn depressed plain text color="white"> Github </v-btn>
      </a>
      <!-- Dark option -->
      <div>
        <v-tooltip v-if="!$vuetify.theme.dark" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              elevation="0"
              v-on="on"
              color="info"
              x-small
              fab
              @click="darkMode"
            >
              <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
            </v-btn>
          </template>
          <span>Dark Mode On</span>
        </v-tooltip>

        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              elevation="0"
              v-on="on"
              color="info"
              x-small
              fab
              @click="darkMode"
            >
              <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
            </v-btn>
          </template>
          <span>Dark Mode Off</span>
        </v-tooltip>
      </div>
      <!-- / Dark option -->
    </v-app-bar>

    <!-- Floating button -->
    <!-- 
    <v-speed-dial
      absolute
      bottom
      right
      fixed
      direction="top"
      open-on-hover
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn color="blue darken-2" dark fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-speed-dial> -->
    <!-- / Floating button -->
  </div>
</template>
<script>
// import store from "@/store/store";

export default {
  data() {
    return {
      defaultAppBarColour: "primary",
    };
  },
  computed: {},
  mounted: function () {
    // // Keep dark mode on if the user's system is on dark mode!
    // if (
    //   window.matchMedia &&
    //   window.matchMedia("(prefers-color-scheme: dark)").matches
    // ) {
    //   // dark mode
    //   this.darkMode();
    // }
    // Watch for changes, if the user changes their current OS theme
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        e.matches ? this.$vuetify.theme.dark : !this.$vuetify.theme.dark; // check this code later
      });
  },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (this.$vuetify.theme.dark) {
        this.defaultAppBarColour = "#272727";
      } else {
        this.defaultAppBarColour = "primary";
      }
    },
  },
};
</script>
<style >
a {
  text-decoration: none;
  color: inherit;
}
#logo {
  color: white !important;
}
.__auth__Button {
  text-transform: initial;
}
</style>