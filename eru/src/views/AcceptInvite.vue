<template>
  <v-app>
    <div class="Login">
      <AcceptInviteComponent />
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import AcceptInviteComponent from "@/components/AcceptInviteComponent.vue";

export default {
  name: "Login",
  components: {
    AcceptInviteComponent,
  },
};
</script>
