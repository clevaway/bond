import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
