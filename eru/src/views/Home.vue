<template>
  <div class="home">
    <DarkModeSwitch />
    <HomeComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue';
import DarkModeSwitch from '@/components/userComponents/DarkModeSwitch.vue';

export default {
  name: 'Home',
  components: {
    HomeComponent,
    DarkModeSwitch,
  },
};
</script>
