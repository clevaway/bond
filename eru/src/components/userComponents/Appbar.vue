<template>
  <span>
    <v-toolbar flat>
      <v-tabs fixed-tabs>
        <v-tab dark :to="routeToHome" class="primary--text">
          <v-icon color="primary">mdi-fire</v-icon>
        </v-tab>
        <div class="__appbar"></div>
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
};
</script>
<style scoped>
.__appbar {
  margin: 2%;
}
</style>