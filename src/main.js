import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import * as apexcharts from "./plugins/apexcharts";
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

new Vue({
  vuetify,
  apexcharts,
  router,
  render: (h) => h(App),
}).$mount("#app");
