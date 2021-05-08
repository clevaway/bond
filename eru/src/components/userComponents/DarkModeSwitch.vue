<template>
  <span @click="darkMode" dark class="primary--text">
    <v-tooltip v-if="!$vuetify.theme.dark" top>
      <template v-slot:activator="{ on }">
        <v-btn class="mt-6" absolute top right elevation="0" v-on="on" color="primary" x-small fab>
          <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
        </v-btn>
      </template>
      <span>Dark Mode On</span>
    </v-tooltip>

    <v-tooltip v-else top>
      <template v-slot:activator="{ on }">
        <v-btn class="mt-6" absolute top right elevation="0" v-on="on" color="primary" x-small fab>
          <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
        </v-btn>
      </template>
      <span>Dark Mode Off</span>
    </v-tooltip>
  </span>
</template>
<script>
import store from '@/store';

export default {
  methods: {
    // function to switch to darkMode
    darkMode() {
      let darkModeOn = (this.$vuetify.theme.dark = !this.$vuetify.theme.dark);
      store.commit('setDarkModeOn', darkModeOn); // setting the state of dark mode in store to be true or false defending on what is gotten
      console.log('setting darkmode to => ' + darkModeOn);
    },
  },
};
</script>