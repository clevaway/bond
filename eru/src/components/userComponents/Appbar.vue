<template>
  <span>
    <v-toolbar bottom class="__stickyAppbar">
      <v-tabs fixed-tabs>
        <v-tab dark :to="routeToHome" class="primary--text">
          <v-icon color="primary">mdi-fire</v-icon>
        </v-tab>
        <v-tab dark :to="routeToChat" class="primary--text">
          <v-icon color="primary">mdi-email</v-icon>
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
    routeToChat: String,
    routeToProfile: String,
  },
};
</script>
<style scoped>
.__stickyAppbar {
  position: fixed;
  width: 100%;
}
</style>