<template>
  <v-app>
    <div class="Login">
      <AuthComponent />
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import AuthComponent from "@/components/AuthComponent.vue";

export default {
  name: "Login",
  components: {
    AuthComponent,
  },
};
</script>
