<template>
  <span>
    <v-toolbar bottom class="__stickyAppbar">
      <v-tabs fixed-tabs>
        <v-tab dark :to="routeToHome" class="primary--text">
          <v-icon color="primary">mdi-fire</v-icon>
        </v-tab>
        <v-tab @click="darkMode" dark class="primary--text">
          <v-tooltip v-if="!$vuetify.theme.dark" top>
            <template v-slot:activator="{ on }">
              <v-btn elevation="0" v-on="on" color="primary" x-small fab>
                <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
              </v-btn>
            </template>
            <span>Dark Mode On</span>
          </v-tooltip>

          <v-tooltip v-else top>
            <template v-slot:activator="{ on }">
              <v-btn elevation="0" v-on="on" color="primary" x-small fab>
                <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
              </v-btn>
            </template>
            <span>Dark Mode Off</span>
          </v-tooltip>
        </v-tab>
        <v-tab :to="routeToProfile" class="primary--text">
          <v-icon color="primary">mdi-account-circle</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>
  </span>
</template>
<script>
export default {
  props: {
    routeToHome: String,
    routeToProfile: String,
  },
  methods: {
    // function to switch to darkMode
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
<style scoped>
.__stickyAppbar {
  position: fixed;
  width: 100%;
}
</style>